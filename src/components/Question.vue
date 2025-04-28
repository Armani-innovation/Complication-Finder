<script setup>
import {computed, inject, onMounted, reactive, ref} from "vue";
import axios from "../axios/axios.js";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import Pagination from "@/components/Pagination.vue";
import OptionInfo from "@/components/OptionInfo.vue";

const route = useRoute();

let isLoading = ref(false);
let questionLoading = ref(false);
let lastQuestion = ref(false);
let firstQuestion = ref(true);

const domain = JSON.parse(sessionStorage.getItem("domain"));
const size = sessionStorage.getItem("size");

let questions = reactive([]);
let questionsKey = reactive([]);
let options = reactive([]);
let optionsInfo = reactive([]);
let domainTitle = ref(null)
let questionHistory = reactive([]);

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);
questionCount.value = route.query.questionNum;

let picked = ref(null);
const selectedOption = computed(() => picked.value || 1);

let data = reactive({
  userid: sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID"),
  size ,
  answer: {}
});

function fetchQuestions() {
  if (domain[1] === 4) {
    fetch("/OrganizationalStructureQuestions.json").then((res) => res.json()).then((resData) => {
      domainTitle.value = resData.name;
      for (const dataKey in resData.questions) {
        questions.push(resData.questions[dataKey])
        questionsKey.push(dataKey);
      }
      for (const dataKey in resData.options) {
        options.push(resData.options[dataKey])
      }
      for (const dataKey in resData.infos) {
        optionsInfo.push(resData.infos[dataKey])
      }
    })
  } else {
    if (size === "small") {
      fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
        domainTitle.value = resData[domain[1]].name;
        for (const dataKey in resData[domain[1]].questions) {
          questions.push(resData[domain[1]].questions[dataKey])
          questionsKey.push(dataKey);
        }
        for (const dataKey in resData[domain[1]].options) {
          options.push(resData[domain[1]].options[dataKey])
        }
        for (const dataKey in resData[domain[1]].infos) {
          optionsInfo.push(resData[domain[1]].infos[dataKey])
        }
      })
    } else if (size === "medium") {
      fetch("/medCompanyQuestions.json").then((res) => res.json()).then((resData) => {
        domainTitle.value = resData[domain[1]].name;
        for (const dataKey in resData[domain[1]].questions) {
          questions.push(resData[domain[1]].questions[dataKey])
          questionsKey.push(dataKey);
        }
        for (const dataKey in resData[domain[1]].options) {
          options.push(resData[domain[1]].options[dataKey])
        }
        for (const dataKey in resData[domain[1]].infos) {
          optionsInfo.push(resData[domain[1]].infos[dataKey])
        }
      })
    } else {
      fetch("/lgCompanyQuestions.json").then((res) => res.json()).then((resData) => {
        domainTitle.value = resData[domain[1]].name;
        for (const dataKey in resData[domain[1]].questions) {
          questions.push(resData[domain[1]].questions[dataKey])
          questionsKey.push(dataKey);
        }
        for (const dataKey in resData[domain[1]].options) {
          options.push(resData[domain[1]].options[dataKey])
        }
        for (const dataKey in resData[domain[1]].infos) {
          optionsInfo.push(resData[domain[1]].infos[dataKey])
        }
      })
    }
  }
}

async function nextQuestion() {
  firstQuestion.value = false;

  if (questionHistory.length > 0) {
    questionLoading.value = true;
    data.answer[`${questionsKey[questionCounter.value]}`] = `${options[questionCounter.value][selectedOption.value - 1]}`;
    data.answer[`${questionsKey[questionCounter.value]}Num`] = selectedOption.value
    await axios.put(`${domain[0]}/`, data).then(() => {
      questionCount.value = questionHistory.pop();
      picked.value = null;
      questionLoading.value = false;
    });
  } else if (questionCounter.value === questions.length - 1) {
    lastQuestion.value = true;
  } else {
    questionLoading.value = true;
    data.answer[`${questionsKey[questionCounter.value]}`] = `${selectedOption.value}.${options[questionCounter.value][selectedOption.value - 1]}`;
    data.answer[`${questionsKey[questionCounter.value]}Num`] = selectedOption.value
    await axios.put(`${domain[0]}/`, data).then(() => {
      questionCount.value++;
      picked.value = null;
      questionLoading.value = false;
    });
  }
}

function sendLastQuestion() {
  data.answer[`${questionsKey[questionCounter.value]}`] = `${selectedOption.value}.${options[questionCounter.value][selectedOption.value - 1]}`;
  data.answer[`${questionsKey[questionCounter.value]}Num`] = selectedOption.value
  isLoading.value = true;
  axios.put(`${domain[0]}/`, data).then(() => {
    router.push("/PayPage")
    isLoading.value = false;
  });
}


onMounted(() => {
  fetchQuestions();
  questionCounter.value = inject("questionCount")
})
</script>

<template>
  <div v-if="!isLoading" class="main">
    <h3 class="domain">{{ domainTitle }}</h3>
    <div class="questionBar">
      <p v-if="!questionLoading">{{ questions[questionCounter] }}</p>
      <a href="">مقاله مربوطه</a>
    </div>
    <ul v-if="!questionLoading">
      <li v-for="(option , index) in options[questionCount]" :key="option" :for="index">
        <input @change="nextQuestion" type="radio" name="option" :id="index"
               :value="Number(index)+1" v-model="picked"/>
        <label :for="index">{{ option }}</label>
        <OptionInfo :optionInfo="optionsInfo[questionCount][index]"/>
      </li>
    </ul>

    <img v-else class="loader" src="../assets/images/Animation.gif" alt="">

    <div class="buttons">

      <button class="saveAndNext" v-if="lastQuestion" @click="sendLastQuestion">
        ارسال پاسخ ها
      </button>

      <Pagination
        :questionCount="questionCount"
        :totalQuestions="questions.length"
      />

    </div>
  </div>
  <img v-else class="loader" src="../assets/images/Animation.gif" alt="">
</template>

<style scoped>
.main {
  width: 70%;
  min-width: 300px;
}

.main h3 {
  margin-bottom: 2vh;
}

.main .domain {
  color: red;
}

.main .questionBar {
  width: 100%;
  margin-bottom: 2vh;
}

.main .questionBar p {
  margin-top: 0;
  display: inline;
}


a {
  display: inline;
  text-decoration: none;
  color: #0056b3;
  position: relative;
  margin-right: 1vw;
  z-index: 0;
}

a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: 0;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}

.main ul {
  width: 90%;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2vh;
  margin: 0 0 4vh 0;
  padding: 0;
}

.main ul li {
  width: 100%;
  background-color: #f4f5f7;
}

.main ul li:hover {
  background-color: #e0e0e0;
}

.main ul li label {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 1vh;
}

.main ul li input {
  cursor: pointer;
  display: none;
}

.main ul li input:checked + label {
  color: green;
  font-weight: bold;
  transition: ease 100ms;
}


/*
.main .buttons .prevQuestion {
  background: none;
  border: none;
  cursor: pointer;
  color: #0022FF;
  box-sizing: content-box;
  margin: 0 !important;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  padding: 10px 15px;
  margin: 5px;
  font-size: 16px;
}

.pagination button.active {
  background: #ffffff;
  color: #000;
  font-weight: bold;
  border-radius: 5px;
}
*/
@media screen and (max-width: 1279px) {
  .main {
    width: 95%;
  }
}

@media screen and (max-width: 768px) {
  .main h3 {
    font-size: 18px;
  }

  .main .questionBar p {
    font-size: 14px;
  }

  .main .questionBar a {
    font-size: 14px;
  }

  .main ul li label {
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .main h3 {
    font-size: 16px;
  }

  .main .questionBar p {
    font-size: 12px;
  }

  .main .questionBar a {
    font-size: 12px;
  }

  .main ul li label {
    font-size: 12px;
  }
}
</style>
