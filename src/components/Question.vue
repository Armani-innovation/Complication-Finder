<script setup>
import {ref, computed, reactive} from "vue";
import Pagination from "@/components/Pagination.vue";
import axios from "@/axios/axios.js";
import OptionInfo from "@/components/OptionInfo.vue";
import router from "@/router/index.js";
// import OptionInfo from "@/components/OptionInfo.vue";

const props = defineProps(["question"])
const domainTitle = sessionStorage.getItem("domain");
const nationalID = sessionStorage.getItem("nationalID");

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);

let isLoading = ref(false);
let questionLoading = ref(false);
let lastQuestion = ref(false);

let questions = reactive(JSON.parse(props.question));
sessionStorage.setItem("questionnaire" , questions.questionnaire) ;
const questionnaire = Number(sessionStorage.getItem("questionnaire"));

console.log(questionnaire)
console.log(questions)

async function nextQuestion(index) {
  questionCounter.value++;
  const res = await axios.post(`questionnaire/${questionnaire}/answer/` , {
    nationalID ,
    question : questions.question.name ,
    option : questions.question.options[index].name
  })
  Object.assign(questions , res.data)
  if (questions.message){
    lastQuestion.value = true ;
  }
}

function sendLastQuestion() {
  router.push("/PayPage")
}

//
// let data = reactive({
//   nationalID: sessionStorage.getItem("nationalID"),
//   question: "" ,
//   option : ""
// });
//
// function sendQuestion() {
//
// }
// const selectedOption = computed(() => picked.value || 1);

// let firstQuestion = ref(true)
// let questions = reactive([]);
// let questionsKey = reactive([]);
// let options = reactive([]);
// let optionsInfo = reactive([]);
// let domainTitle = ref(null)
// let questionHistory = reactive([]);
// questionCount.value = route.query.questionNum;
// function fetchQuestions() {
//   if (domain[1] === 4) {
//     fetch("/OrganizationalStructureQuestions.json").then((res) => res.json()).then((resData) => {
//       domainTitle.value = resData.name;
//       for (const dataKey in resData.questions) {
//         questions.push(resData.questions[dataKey])
//         questionsKey.push(dataKey);
//       }
//       for (const dataKey in resData.options) {
//         options.push(resData.options[dataKey])
//       }
//       for (const dataKey in resData.infos) {
//         optionsInfo.push(resData.infos[dataKey])
//       }
//     })
//   } else {
//     if (size === "small") {
//       fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
//         domainTitle.value = resData[domain[1]].name;
//         for (const dataKey in resData[domain[1]].questions) {
//           questions.push(resData[domain[1]].questions[dataKey])
//           questionsKey.push(dataKey);
//         }
//         for (const dataKey in resData[domain[1]].options) {
//           options.push(resData[domain[1]].options[dataKey])
//         }
//         for (const dataKey in resData[domain[1]].infos) {
//           optionsInfo.push(resData[domain[1]].infos[dataKey])
//         }
//       })
//     } else if (size === "medium") {
//       fetch("/medCompanyQuestions.json").then((res) => res.json()).then((resData) => {
//         domainTitle.value = resData[domain[1]].name;
//         for (const dataKey in resData[domain[1]].questions) {
//           questions.push(resData[domain[1]].questions[dataKey])
//           questionsKey.push(dataKey);
//         }
//         for (const dataKey in resData[domain[1]].options) {
//           options.push(resData[domain[1]].options[dataKey])
//         }
//         for (const dataKey in resData[domain[1]].infos) {
//           optionsInfo.push(resData[domain[1]].infos[dataKey])
//         }
//       })
//     } else {
//       fetch("/lgCompanyQuestions.json").then((res) => res.json()).then((resData) => {
//         domainTitle.value = resData[domain[1]].name;
//         for (const dataKey in resData[domain[1]].questions) {
//           questions.push(resData[domain[1]].questions[dataKey])
//           questionsKey.push(dataKey);
//         }
//         for (const dataKey in resData[domain[1]].options) {
//           options.push(resData[domain[1]].options[dataKey])
//         }
//         for (const dataKey in resData[domain[1]].infos) {
//           optionsInfo.push(resData[domain[1]].infos[dataKey])
//         }
//       })
//     }
//   }
// }
//
//
//
//
// onMounted(() => {
//   fetchQuestions();
//   questionCounter.value = inject("questionCount")
// })
</script>

<template>
  <div v-if="!isLoading" class="main">
    <h3 class="domain">{{ domainTitle }}</h3>
    <div class="questionBar">
      <p v-if="!questionLoading">{{ questions.question.text }}</p>
      <a href="">مقاله مربوطه</a>
    </div>
    <ul v-if="!questionLoading">
      <li v-for="(option , index) in questions.question.options" :key="option" :for="index">
        <input @change="nextQuestion(index)" type="radio" name="option" :id="index"
               :value="Number(index)"/>
        <label :for="index">{{ option.text }}</label>
        <OptionInfo :optionInfo="questions.question.options[index].description" />
      </li>
    </ul>

    <img v-else class="loader" src="../assets/images/Animation.gif" alt="">

    <div class="buttons">

      <button class="saveAndNext" v-if="lastQuestion" @click="sendLastQuestion">
        ارسال پاسخ ها
      </button>

      <Pagination
        :questionCount="questionCount"
        :totalQuestions="questions.number_of_questions"
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
