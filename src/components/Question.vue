<script setup>
import {computed, reactive, ref} from "vue";
import axios from "../axios/axios.js";
import router from "@/router/index.js";

let isLoading = ref(false);
let questionLoading = ref(false);
let lastQuestion = ref(false);
let firstQuestion = ref(true);

const domain = JSON.parse(sessionStorage.getItem("domain"));

let questions = reactive([]);
let questionsKey = reactive([]);
let options = reactive([]);
let domainTitle = ref(null)

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);

let picked = ref(null);
const selectedOption = computed(() => picked.value || 1);


let data = reactive({
  userid: sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID"),
});

function fetchQuestions() {
  if (Number(domain[1]) !== 10) {
    fetch("/questions.json").then((res) => res.json()).then((resData) => {
      domainTitle.value = resData[domain[1]].name;
      for (const dataKey in resData[domain[1]].questions) {
        questions.push(resData[domain[1]].questions[dataKey])
        questionsKey.push(dataKey);
      }
      for (const dataKey in resData[domain[1]].options) {
        options.push(resData[domain[1]].options[dataKey])
      }
    })
  } else {
    fetch("/questions.json").then((res) => res.json()).then((resData) => {
      domainTitle.value = resData[6].name;
      for (const key in resData) {
        for (const keyKey in resData[key].questions) {
          questions.push(resData[key].questions[keyKey]);
          questionsKey.push(keyKey);
        }
        for (const keyKey in resData[key].options) {
          options.push(resData[key].options[keyKey])
        }
      }
    })
  }
}

async function nextQuestion() {
  firstQuestion.value = false;
  if ((questionCounter.value === questions.length - 1)) {
    lastQuestion.value = true;
  } else {
    questionLoading.value = true;
    data[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    await axios.put(`${domain[0]}/`, data).then(() => {
      questionCount.value++;
      picked.value = null;
      questionLoading.value = false;
    });
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: 'smooth',
    });
  }
}

function prevQuestion() {
  if (questionCount.value !== 0) {
    questionLoading.value = true;
    questionCount.value--;
    picked.value = null;
    data[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    questionLoading.value = false;
  } else {
    firstQuestion.value = true;
  }
}

function sendLastQuestion() {
  data[`${questionsKey[questionCount.value]}`] = selectedOption.value;
  isLoading.value = true;
  axios.put(`${domain[0]}/`, data).then(() => {
    router.push("/PayPage")
    isLoading.value = false;
  });
}

fetchQuestions();
</script>

<template>
  <div v-if="!isLoading" class="main">
    <h3 class="domain">{{ domainTitle }}</h3>
    <p v-if="!questionLoading">{{ questions[questionCounter] }}</p>
    <ul v-if="!questionLoading">
      <li v-for="(option , index) in options[questionCount]" :key="option" :for="index">
        <input @change="nextQuestion" type="radio" name="option" :id="index"
               :value="Number(index)+1" v-model="picked"/>
        <label :for="index">{{ option }}</label>
      </li>
    </ul>

    <img v-else class="loader" src="./../assets/Animation.gif" alt="">

    <div class="buttons">

      <button @click="prevQuestion" v-if="!firstQuestion" class="prevQuestion"
      :style="{ margin : lastQuestion ? '0' : '5vh 0'}">
        سوال قبلی
      </button>

      <button class="saveAndNext" v-if="lastQuestion" @click="sendLastQuestion">
        ارسال پاسخ ها
      </button>

    </div>
  </div>
  <img v-else class="loader" src="./../assets/Animation.gif" alt="">
</template>

<style scoped>
.main {
  width: 70%;
  min-width: 300px;
}

.main .domain {
  color: red;
}

.main ul {
  width: 90%;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2vh;
  margin: 5vh 0 0 0;
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

.main .buttons {
  display: flex;
  align-items: center;
}

.main .buttons .prevQuestion{
  background-color: white;
  border: none;
  cursor: pointer;
  color: #0d6efd;
}

@media screen and (max-width: 992px) {
  .main {
    width: 90%;
  }
}
</style>


/*


// import {useCompanyStore} from "./../stores/counter.js";

// const companyStore = useCompanyStore();

// let finalInfo = reactive({
//   domain: "",
//   answers: {},
// });
// else {
//   fetch("/questions.json").then((res) => res.json()).then((resData) => {
//     for (const dataKey in resData.questions) {
//       questions.push(resData.questions[dataKey])
//       questionsKey.push(dataKey);
//     }
//     for (const dataKey in resData.options) {
//       options.push(resData.options[dataKey])
//     }
//   })
// }
// function updateQuestion() {
//   if (questionCounter.value === questions.length - 1) {
//     finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
//     finalInfo.domain = getDomain(props.domain);
//     Object.assign(companyStore.company, finalInfo);
//     isLoading.value = true;
//     axios.post("api/diagnostic/", companyStore.company).then(res => {
//       localStorage.setItem("finalResult", JSON.stringify(res.data))
//       router.push("/PayPage")
//       isLoading.value = false;
//     })
//   } else {
//     finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
//     questionCount.value++;
//     picked.value = null;
//   }
// }


*/
