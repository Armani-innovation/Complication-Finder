<script setup>
import {computed, reactive, ref} from "vue";
import axios from "../axios/axios.js";
import router from "@/router/index.js";

let isLoading = ref(false);

const props = defineProps(["domain"]);

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
  if (Number(props.domain) !== 10) {
    fetch("/questions.json").then((res) => res.json()).then((resData) => {
      domainTitle.value = resData[props.domain].name ;
      for (const dataKey in resData[props.domain].questions) {
        questions.push(resData[props.domain].questions[dataKey])
        questionsKey.push(dataKey);
      }
      for (const dataKey in resData[props.domain].options) {
        options.push(resData[props.domain].options[dataKey])
      }
    })
  } else {
    fetch("/questions.json").then((res) => res.json()).then((resData) => {
      domainTitle.value = resData[6].name ;
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

function getDomain(domainNum) {
  switch (domainNum) {
    case "1" :
      return "human_resources";
    case "2" :
      return "financial_resources";
    case "3" :
      return "sales_and_marketing";
    case "4" :
      return "capital_structure";
    case "5" :
      return "management_organizational_structure";
    case "6" :
      return "customer_relationship_management";
    case "7" :
      return "manufacturing_and_production";
    case "8" :
      return "research_and_development";
    case "9" :
      return "product_competitiveness";
  }
}

function updateQuestion() {
  if (questionCounter.value === questions.length - 1) {
    data[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    isLoading.value = true;
    axios.put(`${getDomain(props.domain)}/`, data).then(() => {
      router.push("/PayPage")
      isLoading.value = false;
    });
  } else {
    data[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    axios.put(`${getDomain(props.domain)}/`, data).then(() => {
      questionCount.value++;
      picked.value = null;
    });
  }
}

fetchQuestions();
</script>

<template>
  <div v-if="!isLoading" class="main">
    <h3 class="domain">{{ domainTitle }}</h3>
    <p>{{ questions[questionCounter] }}</p>
    <ul>
      <li v-for="(option , index) in options[questionCount]" :key="option" :for="index">
        <input type="radio" name="option" :id="index" :value="Number(index)+1" v-model="picked"/>
        <label :for="index">{{ option }}</label>
      </li>
    </ul>
    <button class="saveAndNext" @click="updateQuestion" :disabled="!picked">
      ذخیره و بعدی
    </button>
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
