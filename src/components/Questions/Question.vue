<script setup>
import {ref, reactive, onMounted} from "vue";
import Pagination from "@/components/Questions/Pagination.vue";
import OptionInfo from "@/components/Questions/OptionInfo.vue";
import {getTokenInfo} from "@/composables/composable.js";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";

const props = defineProps(["question"])
const nationalId = sessionStorage.getItem("nationalID");

let nationalID = ref("")

let questionCount = ref(0);

let isLoading = ref(false);
let questionLoading = ref(false);
let lastQuestion = ref(false);

let questions = reactive(JSON.parse(props.question));
questionCount.value = questions.question.num_of_question ;
let questionnaire = reactive(0);

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = user.nationalID;
  if (nationalId) {
    nationalID.value = nationalId;
  }
}

async function nextQuestion(index) {
  questionLoading.value = true;
  const res = await axios.post(`questionnaire/${questionnaire}/answer/`, {
    nationalID: nationalID.value,
    question: questions.question.name,
    option: questions.question.options[index].name
  })
  Object.assign(questions, res.data)
  questionCount.value = questions.question.num_of_question ;
  if (questions.message) {
    lastQuestion.value = true;
  }
  questionLoading.value = false;
}

function sendLastQuestion() {
  router.push("/PayPage")
}

onMounted(() => {
  fetchInfos();
  sessionStorage.setItem("questionnaire", questions.questionnaire);
  questionnaire = Number(sessionStorage.getItem("questionnaire"));
})

</script>

<template>
  <div v-if="!isLoading" class="main">
    <h3 class="domain">{{ domainTitle }}</h3>
    <div class="questionBar">
      <p class="no-select" v-if="!questionLoading"> {{ questionCount }}.{{ questions.question.text }}</p>
      <a v-show="questions.question.link" :href="questions.question.link" target="_blank">مقاله مربوطه</a>
    </div>
    <ul v-if="!questionLoading">
      <li v-for="(option , index) in questions.question.options" :key="option" :for="index">
        <input @change="nextQuestion(index)" type="radio" name="option" :id="index"
               :value="Number(index)"/>
        <label class="no-select" :for="index">{{ option.text }}</label>
        <OptionInfo :optionInfo="questions.question.options[index].description"/>
      </li>
    </ul>

    <img v-else class="loader" src="../../assets/images/Animation.gif" alt="">

    <div class="buttons">

      <button class="saveAndNext" v-if="lastQuestion" @click="sendLastQuestion">
        ارسال پاسخ ها
      </button>

      <Pagination
        :questionCount="questionCount-1"
        :totalQuestions="questions.question.all_questions"
      />
    </div>
  </div>
  <img v-else class="loader" src="../../assets/images/Animation.gif" alt="">
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

.main .loader {
  margin-top: 2vh;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

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
