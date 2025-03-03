<script setup>
import {computed, reactive, ref} from "vue";
import {useCompanyStore} from "./../stores/counter.js";
import axios from "../axios/axios.js";
import router from "@/router/index.js";

const companyStore = useCompanyStore();
const props = defineProps(["domain"]);

let questions = reactive([]);
let questionsKey = reactive([]);
let options = reactive([]);

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);

let picked = ref(null);
const selectedOption = computed(() => picked.value || 0);

let finalInfo = reactive({
  domain: "",
  answers: {},
});

function fetchQuestions() {
  fetch("/questions.json").then((res) => res.json()).then((resData) => {
    for (const dataKey in resData[props.domain].questions) {
      questions.push(resData[props.domain].questions[dataKey])
      questionsKey.push(dataKey);
    }
    for (const dataKey in resData[props.domain].options) {
      options.push(resData[props.domain].options[dataKey])
    }
  })
}

function updateQuestion() {
  if (questionCounter.value === questions.length - 1) {

    finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    finalInfo.domain = getDomain(props.domain);
    Object.assign(companyStore.company, finalInfo);

    axios.post("api/diagnostic/", companyStore.company).then(res => {
      localStorage.setItem("finalResult", JSON.stringify(res.data))
      router.push("/PayPage")
    })

  } else {

    finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    questionCount.value++;
    picked.value = null;

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
      return "ساختار سرمایه";
    case "5" :
      return "ساختار مدیریتی و سازمانی";
    case "6" :
      return "مدیریت ارتباط با مشتری";
    case "7" :
      return "ساخت و تولید";
    case "8" :
      return "تحقیق و توسعه";
    case "9" :
      return "رقابت پذیری محصول";
  }
}

fetchQuestions();

</script>

<template>
  <div class="main">
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
</template>

<style scoped>
.main {
  width: 50%;
  min-width: 300px;
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vw;
  position: relative;
  margin: 5vh auto;
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
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 15px;
  background-color: #f4f5f7;
  cursor: pointer;
  padding: 1vh;
  transition: all 0.3s ease;
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

.main .saveAndNext {
  width: 100%;
  max-width: 200px;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 10vh auto 5vh auto;;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
  transition: all 0.3s ease;
}

.main .saveAndNext:hover {
  background-color: #0056b3;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}

</style>
