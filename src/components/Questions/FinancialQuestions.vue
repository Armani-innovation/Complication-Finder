<script setup>
import {ref, reactive, onMounted} from "vue";
import Pagination from "@/components/Questions/Pagination.vue";
import {getTokenInfo} from "@/composables/composable.js";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";
import {useQuestionStore} from "@/stores/counter.js";

const nationalId = sessionStorage.getItem("nationalID");

let nationalID = ref("")
let questionCount = ref(0);
let isLoading = ref(false);
let answer = ref("");

let questions = reactive(useQuestionStore().question);
questionCount.value = questions.question.num_of_question;
let questionnaire = reactive(0);

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = user.nationalID;
  if (nationalId) {
    nationalID.value = nationalId;
  }
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
    await router.push("/FinancialPayPage")
  }
}

onMounted(() => {
  sessionStorage.setItem("questionnaire", questions.questionnaire);
  questionnaire = Number(sessionStorage.getItem("questionnaire"));
  fetchInfos();
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

.main input {
  outline: none;
  width: 45%;
  height: 5vh;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  padding: 0 2%;
  background-color: #ffffff;
  font-size: 15px;
  margin: 8vh auto 10vh auto;
}

.main input:hover {
  background-color: #f4f5f7;
}
</style>
