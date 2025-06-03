<script setup>
import Timer from "@/components/Results/Timer.vue";
import axios from "@/axios/axios.js";
import {onMounted, ref, reactive} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const props = defineProps(["result"]);
const result = JSON.parse(props.result);

let nationalid = ref(null);

let report_id = ref(null);

const questionnaire = Number(sessionStorage.getItem("questionnaire"));
const nationalID = ref("");
let name = ref("");
let domain = ref("");

let isLoading = ref(true);
let finalMessage = ref("")

let message = reactive([]);

let interval;

let requested = ref(false);

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = nationalid.value || user.nationalID;
  name.value = user.name;
  domain.value = user.company_domain;
  if (result || requested.value) {
    await getResultsFromProps()
  } else {
    await firstRequest()
    interval = setInterval(async () => {
      await getResult();
    }, 60000)
    // await getResult() ;
  }
}

async function firstRequest() {
  sessionStorage.setItem("requested" , true) ;
  const res = await axios.post(`questionnaire/report/`, {
    nationalID: nationalID.value,
    questionnaire_id: questionnaire
  })
  report_id.value = res.data.report_id
}

async function getResult() {
  const res = await axios.get(`questionnaire/${report_id.value}/result/`)
  if (res.data.status === "done") {
    clearInterval(interval)
    finalMessage.value = res.data.result;

    await processMessage()
    isLoading.value = false
  }
}

async function getResultsFromProps() {
  finalMessage.value = result;

  await processMessage()
  isLoading.value = false
}

async function processMessage() {
  finalMessage.value = finalMessage.value.toString().replace(/\u200c/g, " ");
  finalMessage.value = finalMessage.value.toString().replace(/\n\n/g, "\n");

  message = finalMessage.value.toString().split("end first")
}

const generatePDF = async () => {
  const element = document.getElementById("pdf-content");

  if (!element) return;

  const canvas = await html2canvas(element, {scale: 3});
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yPosition = 0;

  while (yPosition < imgHeight) {
    pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
    yPosition += pageHeight;

    if (yPosition < imgHeight) {
      pdf.addPage();
    }
  }

  pdf.save(`گزارش عارضه یابی .pdf`);
};

// function handleBeforeUnload(e) {
//   sessionStorage.setItem('diagnosisRefresh', 'true')
//
//   e.preventDefault()
//   e.returnValue = ''
// }
//
// const diagnosisFlag = sessionStorage.getItem('diagnosisRefresh')
//
// if (diagnosisFlag === 'true') {
//   sessionStorage.removeItem('diagnosisRefresh')
//   alert('شما صفحه را رفرش کردید. برای دیدن نتیجه عارضه‌یابی به پروفایل خود بروید.')
//   window.location.href = '/profile'
// }

onMounted(() => {
  nationalid.value = JSON.parse(sessionStorage.getItem("nationalID")) ;
  requested.value = JSON.parse(sessionStorage.getItem("requested")) ;
  fetchInfos();
  // window.addEventListener('beforeunload', handleBeforeUnload)
})

// onBeforeMount(()=>{
//   window.removeEventListener('beforeunload', handleBeforeUnload)
// })

</script>

<template>
  <div id="pdf-content" class="main" v-if="!isLoading">

    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>

    <div class="finalResult">
      <h3>گزارش عارضه یابی شرکت {{ name }} در حوزه تحلیل صورت های مالی</h3>

      <p>
        {{ message[0] }}
      </p>
      <p>
        {{ message[1] }}
      </p>

      <p class="finalText">
        شما می‌ توانید برای دریافت راهکارهای اجرایی به منظور حل عارضه ‌های خود با مشاوران ما در تماس
        باشید
        <br>
        <a href="tel:+982332300357">32300357-023</a>
        یا
        <a href="tel:+989046504331">09046504331</a>
        <br>
      </p>
    </div>
  </div>
  <img v-if="isLoading" class="loader" src="../../assets/images/Animation.gif" alt="">
  <div v-if="isLoading" class="waiting">
    <Timer/>
    <p>
      پاسخ های شما در حال تحلیل و بررسی است
      نتایج عارضه یابی هوشمند کسب و کار تا 15 دقیقه دیگر قابل مشاهده خواهد بود
      با تشکر از صبر و شکیبایی شما
    </p>
  </div>
  <div v-else class="options">
    <router-link class="saveAndNext" to="/domains">
      ادامه عارضه یابی
    </router-link>
    <button class="saveAndNext" @click="generatePDF">دریافت فایل pdf صفحه</button>
  </div>
</template>

<style scoped>
hr {
  width: 80%;
  border: 1px solid black;
}

.main {
  max-height: max-content;
  width: 75%;
  min-width: 300px;
  background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95)), url("../../assets/images/logo.png") repeat-y center center;
  background-size: contain;
  z-index: 0;
}

.main .logo {
  width: 7vw;
  display: flex;
  justify-content: start;
}

.main .logo img {
  width: 100%;
  height: 100%;
}

.main .finalResult {
  width: 100%;
  height: max-content;
}

.main .finalResult h3 {
  margin-top: 3vh;
}

.main .finalResult p {
  line-height: 1.8;
}

.main .finalResult .textAndChart div {
  max-width: 70%;
}

.main .finalText {
  width: 100%;
  text-align: center;
}

.main .finalText a {
  color: black;
  text-decoration: none;
}

.waiting {
  width: 100%;
  text-align: center;
}

.waiting p {
  color: white;
  display: block;
}

p {
  white-space: pre-line;
}

.options {
  width: 50%;
  display: flex;
  margin: 0 auto;
}

</style>
