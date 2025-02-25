<script setup>
import {computed, reactive, ref} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import { useCompanyStore } from "./../stores/counter.js";
import {useResultStore} from "./../stores/counter.js";
const companyStore = useCompanyStore();
const resultStore = useResultStore();

const props = defineProps(["domain"]);

let questions = reactive([]);
let questionsKey = reactive([]);
let options = reactive([]);

let questionCount = ref(0);
const questionCounter = computed(() => questionCount.value);

let picked = ref(null);
const selectedOption = computed(() => picked.value || 0);

let finalInfo = reactive({
  domain : "" ,
  answers : {},
}) ;
let finalScore = ref(0);

function getDomain(domainNum){
  switch (domainNum) {
    case "1" :
      return "human_resources";
    case "2" :
      return "financial_resources";
    case "3" :
      return "sales_and_marketing" ;
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

function fetchQuestions() {
  axios.get("./../../public/questions.json").then((res => {
    for (const resKey in res.data[props.domain].questions) {
      questions.push(res.data[props.domain].questions[resKey])
      questionsKey.push(resKey);
    }
    for (const resKey in res.data[props.domain].options) {
      options.push(res.data[props.domain].options[resKey])
    }
  }))
}

function updateQuestion() {
  if (questionCounter.value === questions.length - 1) {
    finalScore.value += selectedOption.value;
    finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    finalInfo.domain = getDomain(props.domain);
    Object.assign(companyStore.company , finalInfo);

    axios.post("http://5.144.130.141:8807/api/diagnostic/", companyStore.company, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      resultStore.setResult(res.data);
      router.push("/PayPage")
    })
  } else {
    finalInfo.answers[`${questionsKey[questionCount.value]}`] = selectedOption.value;
    questionCount.value++;
    finalScore.value += selectedOption.value;
    picked.value = null;
  }
}

fetchQuestions();
</script>

<template>
  <div class="main">
    <p>{{ questions[questionCounter] }}</p>
    <ul>
      <li v-for="(option , index) in options" :key="option" :for="index">
        <input name="option" type="radio" :id="index" :value="Number(index)+1" v-model="picked"/>
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
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vh;
  position: relative;
}

.main ul {
  width: 20%;
  height: 35vh;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2vh;
  margin: 5vh 2vw;
  padding: 0;
}

.main ul li {
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: #f4f5f7;
  cursor: pointer;
}

.main ul li label {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.main ul li input {
  cursor: pointer;
  margin: 0 0.2vw;
}

.main .saveAndNext {
  width: 10vw;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 0 auto;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}
</style>
