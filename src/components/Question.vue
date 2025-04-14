<script setup>
import {computed, inject, onMounted, reactive, ref} from "vue";
import axios from "../axios/axios.js";
import router from "@/router/index.js";
import Pagination from "@/components/Pagination.vue";
// import {useNumOfPersons} from "@/stores/counter.js";

let isLoading = ref(false);
let questionLoading = ref(false);
let lastQuestion = ref(false);
let firstQuestion = ref(true);
// let questionDescription = ref("");

// const numOfUsers = useNumOfPersons().numOfPersons;
const domain = JSON.parse(sessionStorage.getItem("domain"));

let questions = reactive([]);
let questionsKey = reactive([]);
let options = reactive([]);
let domainTitle = ref(null)
let questionHistory = reactive([]);

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);

let picked = ref(null);
const selectedOption = computed(() => picked.value || 1);

let data = reactive({
  userid: sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID"),
});

function fetchQuestions() {
  // if (Number(domain[1]) !== 10) {
  //   fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
  //     domainTitle.value = resData[domain[1]].name;
  //     for (const dataKey in resData[domain[1]].questions) {
  //       questions.push(resData[domain[1]].questions[dataKey])
  //       questionsKey.push(dataKey);
  //     }
  //     for (const dataKey in resData[domain[1]].options) {
  //       options.push(resData[domain[1]].options[dataKey])
  //     }
  //   })
  // } else {
  //   fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
  //     for (const key in resData) {
  //
  //       for (const keyKey in resData[key].questions) {
  //         questions.push(resData[key].questions[keyKey]);
  //         questionsKey.push(keyKey);
  //       }
  //       for (const keyKey in resData[key].options) {
  //         options.push(resData[key].options[keyKey])
  //       }
  //     }
  //   })
  // }
  // if (numOfUsers <= 10) {
  //   fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
  //     domainTitle.value = resData[domain[1]].name;
  //     for (const dataKey in resData[domain[1]].questions) {
  //       questions.push(resData[domain[1]].questions[dataKey])
  //       questionsKey.push(dataKey);
  //     }
  //     for (const dataKey in resData[domain[1]].options) {
  //       options.push(resData[domain[1]].options[dataKey])
  //     }
  //   })
  // } else if (numOfUsers > 10 && numOfUsers <= 50) {
  //   fetch("/medCompanyQuestions.json").then((res) => res.json()).then((resData) => {
  //     domainTitle.value = resData[domain[1]].name;
  //     for (const dataKey in resData[domain[1]].questions) {
  //       questions.push(resData[domain[1]].questions[dataKey])
  //       questionsKey.push(dataKey);
  //     }
  //     for (const dataKey in resData[domain[1]].options) {
  //       options.push(resData[domain[1]].options[dataKey])
  //     }
  //   })
  // } else {
  //   fetch("/lgCompanyQuestions.json").then((res) => res.json()).then((resData) => {
  //     domainTitle.value = resData[domain[1]].name;
  //     for (const dataKey in resData[domain[1]].questions) {
  //       questions.push(resData[domain[1]].questions[dataKey])
  //       questionsKey.push(dataKey);
  //     }
  //     for (const dataKey in resData[domain[1]].options) {
  //       options.push(resData[domain[1]].options[dataKey])
  //     }
  //   })
  // }
}

// function goToQuestion(index) {
//   questionHistory.push(questionCount.value);
//   questionCount.value = index;
//   picked.value = null;
// }

async function nextQuestion() {
  firstQuestion.value = false;

  if (questionHistory.length > 0) {
    questionLoading.value = true;
    data[`${questionsKey[questionCounter.value]}`] = selectedOption.value;
    await axios.put(`${domain[0]}/`, data).then(() => {
      questionCount.value = questionHistory.pop();
      picked.value = null;
      questionLoading.value = false;
    });
  } else if (questionCounter.value === questions.length - 1) {
    lastQuestion.value = true;
  } else {
    questionLoading.value = true;
    data[`${questionsKey[questionCounter.value]}`] = selectedOption.value;
    await axios.put(`${domain[0]}/`, data).then(() => {
      questionCount.value++;
      picked.value = null;
      questionLoading.value = false;
    });
  }
}

function sendLastQuestion() {
  data[`${questionsKey[questionCounter.value]}`] = selectedOption.value;
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
<!--      <div class="icon">-->
<!--        <font-awesome-icon icon="question"/>-->
<!--      </div>-->
      <a href="">مقاله مربوطه</a>
    </div>
    <ul v-if="!questionLoading">
      <li v-for="(option , index) in options[questionCount]" :key="option" :for="index">
        <input @change="nextQuestion" type="radio" name="option" :id="index"
               :value="Number(index)+1" v-model="picked"/>
        <label :for="index">{{ option }}</label>
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

      <!--        :goToQuestion="goToQuestion"-->
      <!--      <button class="saveAndNext" v-if="!lastQuestion && !firstQuestion">-->
      <!--        ذخیره پاسخ ها-->
      <!--      </button>-->

    </div>
  </div>
  <img v-else class="loader" src="../assets/images/Animation.gif" alt="">
</template>

<style scoped>
.main {
  width: 70%;
  min-width: 300px;
  margin-top: 30vh;
}

.main .domain {
  color: red;
}

.main .questionBar {
  display: flex;
  align-items: start;
}

.main .questionBar p {
  margin-top: 0;
}
/*
.main .questionBar .icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  margin: 0 1vw;
  padding: 2px 5px;
  border: 1px solid white;
  color: white;
  background-color: lightgray;
  border-radius: 5px;
  cursor: pointer;
}

.main .questionBar .icon::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  opacity: 0;
  background-color: #0d6efd;
  bottom: -12px;
  transform: rotateZ(315deg);
  cursor: default;
  transition: 200ms all ease;
  pointer-events: none;
}

.main .questionBar .icon::after {
  position: absolute;
  content: "v-bind(questionDescription)";
  width: max-content;
  max-width: 300px;
  height: max-content;
  background-color: #0d6efd;
  bottom: -45px;
  padding: 1vh 1vw;
  cursor: default;
  color: white;
  border-radius: 15px;
  opacity: 0;
  pointer-events: none;
  transition: 200ms all ease;
}

.main .questionBar .icon:hover::before {
  opacity: 1;
}

.main .questionBar .icon:hover::after {
  opacity: 1;
}
*/
.main .questionBar a {
  text-decoration: none;
  color: #0056b3;
  position: relative;
  margin-right: 1vw;
  z-index: 0;
}

.main .questionBar a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: 0;
  right: 50%;
  transition: 200ms all ease;
}

.main .questionBar a:hover::before {
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

</style>
