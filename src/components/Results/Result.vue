<script setup>
import GaugeChart from "@/components/Charts/GaugeChart.vue";
import RadarChart from "@/components/Charts/RadarChart.vue";
import Timer from "@/components/Results/Timer.vue";
import axios from "@/axios/axios.js";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

let nationalid = ref(null);

let report_id = ref(null);

const questionnaire = Number(sessionStorage.getItem("questionnaire"));
const nationalID = ref("");
let name = ref("");

let isLoading = ref(true);

let finalResult = reactive({
  overallScore: 0,
  messages: "",
  domain: "",
  subdomain_scores: {}
})

let keys = reactive([]);
let values = reactive([]);
let finalMessage = ref("")

let message = reactive([]);
let firstPartMessage = ref("");
let secondPartMessage = reactive([]);

let interval;

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = user.nationalID;
  if (nationalid.value) {
    const res = await axios.get("company/" , {params : {nationalID : nationalid.value}});
    name.value = res.data.name;
  } else {
    name.value = user.name;
  }
  await firstRequest()
  interval = setInterval(async () => {
    await getResult();
  }, 60000)
  // await getResult() ;
}

async function firstRequest() {
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
    finalMessage.value = res.data.result.messages;
    await Object.assign(finalResult, res.data.result);

    for (const score in finalResult.subdomain_scores) {
      keys.push(score)
      values.push(finalResult.subdomain_scores[score])
    }

    await processMessage()
    isLoading.value = false
  }
}

async function processMessage() {
  finalMessage.value = finalMessage.value.toString().replace(/\u200c/g, " ");

  message = finalMessage.value.toString().split("start first")
  firstPartMessage.value = message[1].toString().replace("end first", "");
  firstPartMessage.value = firstPartMessage.value.toString().replace(/\([^()]*\)/g, "");
  firstPartMessage.value = firstPartMessage.value.toString().replace("پاراگراف اول:", "");
  firstPartMessage.value = firstPartMessage.value.toString().replace("پاراگراف دوم:", "");
  firstPartMessage.value = firstPartMessage.value.toString().replace("پاراگراف سوم:", "");

  const secondPart = message[0].toString().replace(/start this subdomain/g, "");
  secondPartMessage = secondPart.toString().split("end this subdomain");
}

const generatePDF = async () => {
  const element = document.getElementById("pdf-content");
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 1.5,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.7);
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let yPosition = 0;

  while (yPosition < imgHeight) {
    pdf.addImage(imgData, "JPEG", 0, -yPosition, imgWidth, imgHeight);
    yPosition += pageHeight;
    if (yPosition < imgHeight) {
      pdf.addPage();
    }
  }

  pdf.save(`گزارش عارضه یابی ${finalResult.domain} شرکت ${name.value}.pdf`);
};


function handleBeforeUnload(e) {
  sessionStorage.setItem('diagnosisRefresh', 'true')

  e.preventDefault()
  e.returnValue = ''
}

const diagnosisFlag = sessionStorage.getItem('diagnosisRefresh')

if (diagnosisFlag === 'true') {
  sessionStorage.removeItem('diagnosisRefresh')
  alert('شما صفحه را رفرش کردید. برای دیدن نتیجه عارضه‌یابی به پروفایل خود بروید.')
  window.location.href = '/profile'
}

onMounted(() => {
  nationalid.value = JSON.parse(sessionStorage.getItem("nationalID"))
  fetchInfos();
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeMount(()=>{
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

</script>

<template>
  <div id="pdf-content" class="main" v-if="!isLoading">

    <div class="logo">
      <img src="../../assets/images/logo.png" alt="">
    </div>

    <div class="finalResult">
      <h3>
        گزارش عارضه یابی {{finalResult.domain}}
        <br>
        <span>شرکت {{name}}</span>
      </h3>
      <div class="textAndChart">
        <div>
          <p>
            {{ firstPartMessage }}
          </p>
        </div>
        <GaugeChart class="gaugeChart" :value="finalResult.overallScore"/>
      </div>

      <div class="chartAndResults">
        <RadarChart class="radarChart" :values="values" :keys="keys"/>
        <br>
        <div v-for="(message , index) in secondPartMessage" :key="message">
          <p>
            {{ message }}
          </p>
          <hr v-if="index !== secondPartMessage.length-1">
        </div>
      </div>
    </div>

    <p class="finalText">
      شما می‌ توانید برای دریافت راهکارهای اجرایی به منظور حل عارضه ‌های خود با مشاوران ما در تماس باشید
      <br> <br>
      <a href="tel:+982332300357">32300357-023</a>
      یا
      <a href="tel:+989046504331">09046504331</a>
      <br>
    </p>
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

.main .finalResult h3 span {
  font-size: 16px;
}

.main .finalResult p {
  line-height: 1.8;
}

.main .finalResult .textAndChart {
  width: 100%;
  display: flex;
}

.main .finalResult .textAndChart .gaugeChart {
  width: 30%;
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
