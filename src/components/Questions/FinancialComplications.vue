<script setup>
import axios from "@/axios/axios.js";
import Pagination from "@/components/Questions/Pagination.vue";
import {onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";
import router from "@/router/index.js";

const domain = "تحلیل صورت های مالی"
let isLoading = ref(false);
let questionCount = ref(0);
let nationalID = ref("");
let questionnaire = reactive(0);
let answer = ref("");

const questions = reactive({
  questionnaire: 0,
  question: {
    name: "",
    text: "",
    size: "",
    question_type: "",
    options: [],
    link: null,
    num_of_question: 1,
    all_questions: 7
  }
})

async function fetchUser() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  nationalID.value = infos.nationalID;
}

async function fetchQuestions() {
  const res = await axios.post("start-questionnaire/", {
    domain,
    nationalID: nationalID.value
  })
  isLoading.value = false;
  Object.assign(questions, res.data)
  sessionStorage.setItem("questionnaire", res.data.questionnaire);
  questionnaire = Number(sessionStorage.getItem("questionnaire"));
}

async function nextQuestion() {
  isLoading.value = true;
  const res = await axios.post(`questionnaire/${questionnaire}/answer/`, {
    nationalID: nationalID.value,
    question: questions.question.name,
    text_answer: answer.value
  })
  answer.value = "";
  Object.assign(questions, res.data)
  questionCount.value = questions.question.num_of_question;
  isLoading.value = false;
  if (res.data.message) {
    await router.push("/HistoryResult")
  }
}

onMounted(async () => {
  isLoading.value = true;
  await fetchUser();
  await fetchQuestions()
})
</script>

<template>
  <div class="main">
    <h3>عارضه یابی مالی</h3>
    <p>لطفا به سوالات زیر با توجه به صورت سود و زیان و ترازنامه سال مالی گذشته پاسخ دهید: (مقادیر را
      به عدد و به واحد ریال وارد کنید)</p>

    <img v-if="isLoading" src="../../assets/images/Animation.gif" alt=""/>
    <input v-else v-model="answer" type="text" :placeholder="questions.question.text"/>

    <Pagination
      :questionCount="questions.question.num_of_question-1"
      :totalQuestions="questions.question.all_questions"
    />

    <button class="saveAndNext" @click="nextQuestion">
      ارسال پاسخ
    </button>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
}

.main h3 {
  color: red;
}

.main p {
  font-weight: bold;
}

.main .questions {
  height: 20vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10% 2%;
}

.main input {
  outline: none;
  width: 35%;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  padding: 0 2%;
  background-color: #ffffff;
  font-size: 15px;
  margin: 0 auto;
}

.main input:hover {
  background-color: #f4f5f7;
}
</style>
