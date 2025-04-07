<script setup>
import GaugeChart from './GaugeChart.vue'
import RadarChart from "./RadarChart.vue";
import axios from "@/axios/axios.js";
import {ref, reactive, watch} from "vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const domain = JSON.parse(sessionStorage.getItem("domain"));

const data = {
  userid: sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID")
}

let isLoading = ref(true);

let finalResults = reactive({})
const scores = reactive([]);
const keys = reactive([]);
let companyName = ref("");
let companyDomain = ref("");
let overallScore = ref(0);

let improveSituations = ref(null);

axios.get(`${domain[0]}/`, {params: data}).then((response) => {
  Object.assign(finalResults, response.data)
  isLoading.value = false;
})

watch(finalResults, (finalResultsFetch) => {
  for (const key in finalResultsFetch.results) {
    if (key !== "overallScore") {
      scores.push(finalResultsFetch.results[key]);
      keys.push(key)
    }
  }
  companyName.value = finalResultsFetch.company.name;
  companyDomain.value = finalResultsFetch.domain;
  overallScore.value = finalResultsFetch.results.overallScore;

})

fetch("/improveSituation.json").then((res) => res.json())
  .then((resData) => {
      improveSituations.value = resData[(domain[1]) - 1];
    }
  )

function setIndex(index) {
  if (scores[index] >= 0 && scores[index] < 1) {
    return 1;
  } else if (scores[index] >= 1 && scores[index] < 2) {
    return 2;
  } else if (scores[index] >= 2 && scores[index] < 3) {
    return 3;
  } else if (scores[index] >= 3 && scores[index] < 4) {
    return 4;
  } else if (scores[index] >= 4 && scores[index] <= 5) {
    return 5;
  }
}

const generatePDF = async () => {
  const element = document.getElementById("pdf-content");

  if (!element) return;

  const canvas = await html2canvas(element, { scale: 3 });
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

  pdf.save(` گزارش عارضه یابی ${companyDomain.value} شرکت ${companyName.value} .pdf`);
};

</script>

<template>
  <div id="pdf-content" class="main" v-if="!isLoading">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <h2>گزارش عارضه یابی {{ companyDomain }} <br>
      <span> شرکت {{ companyName }} </span>
    </h2>
    <div class="textAndChart">
      <p>
        رقابت شدید و سرعت تغییرات در بازارها و روندهای پیش بینی نشده اقتصادی باعث شده تا اهمیت
        توجه
        به
        بازاریابی و فروش نسبت به چند سال گذشته دو چندان گردد. لزوم برنامه ریزی منظم و رعایت اصول
        بازاریابی و فروش از عوامل حیاتی حفظ و نگه داشت جایگاه کسب و کارها در دنیای امروز است.
        باتوجه
        به اهمیت این واحد، لازم است معیار های استاندارد برای سنجش فرآیندهای فروش و مارکتینگ طراحی
        و
        وضعیت چگونگی انجام کار هر یک مشخص شود.
        KPI های فروش شاخص‌های برجسته‌ای هستند که به یک رهبر فروش، مدیر فروش و تیم فروش کمک می‌کنند
        تا
        میزان پیشرفت خود را در رسیدن به اهداف فروش و اهداف سازمانی تعیین کنند. یک واحد فروش موفق،
        به
        داده‌های فروش صحیح دسترسی دارد. با استفاده از KPI، بخش فروش شما می‌تواند:
        <br>
        • پیشرفت خود را در دستیابی به اهداف پیگیری کند.
        <br>
        • فرآیند شناسایی، جذب و نگهداشت مشتریان خود را بهینه کند.
        <br>
        • بهبود جریان درآمد را عملی کند.
      </p>
      <GaugeChart class="gaugeChart" :value="overallScore"></GaugeChart>
    </div>

    <RadarChart :keys="keys" :values="scores"></RadarChart>

    <h2 style="color: #0056b3">پیشنهاداتی برای بهبود عملکرد</h2>

    <div class="improveSituation" v-for="(improveSituation , index) in improveSituations"
         :key="index">
      <h4>{{ improveSituation[0] }}</h4>
      <div>
        <pre>
        {{ improveSituation[setIndex(index)] }}
        </pre>
        <GaugeChart class="gaugeChartPre" :value="scores[index]"></GaugeChart>
      </div>
      <hr style="height: 2px; background-color: black">
    </div>
    <router-link class="saveAndNext" to="/domains">
      ادامه عارضه یابی
    </router-link>
    <p class="finalText">
      شما می‌توانید برای دریافت راهنمایی بیشتر و استفاده از نظرات تخصصی مشاوران فروش و مارکتینگ
      شرکت
      دانش بنیان شبکه نوآوری آرمانی با شماره‌های
      <a href="tel:+982332300357">32300357-023</a>
      یا
      <a href="tel:+989046504331">09046504331</a>
      تماس حاصل نمایید.
    </p>
  </div>
  <img v-else src="./../assets/Animation.gif" alt="">
  <button class="saveAndNext" @click="generatePDF">دریافت فایل pdf صفحه</button>
</template>

<style scoped>
.main {
  width: 80%;
  min-width: 300px;
  background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url("./../assets/logo.png") repeat-y center center;
  background-size: contain;
}

.main span {
  font-size: 18px;
}

.main .logo {
  width: 7vw;
  aspect-ratio: 4/4;
  display: flex;
  justify-content: start;
}

.main .logo img {
  width: 100%;
  height: 100%;
}

.main p {
  width: 50%;
  text-align: justify;
}

.main .textAndChart {
  width: 100%;
  display: flex;
  margin-bottom: 15vh;
}

.main .gaugeChart {
  width: 35vw;
  height: auto;
  margin: 0 auto;
}

.main h3 {
  color: #0056b3;
}

.main .improveSituation pre {
  font-family: "B Yekan", cursive;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 50%;
}

.main .improveSituation h4 {
  width: 50%;
}

.main .improveSituation div {
  display: flex;
}

.main .improveSituation div .gaugeChartPre {
  width: 25vw;
  aspect-ratio: 4/4;
}

.main .finalText {
  width: 100%;
  text-align: center;
}

.main .finalText a {
  color: black;
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .main .textAndChart {
    flex-direction: column;
    margin: 0;
  }

  .main .textAndChart p {
    width: 100%;
  }

  .main .gaugeChart {
    width: 55vw;
    height: 50vh;
    margin: 0 auto;
  }

  .main .improveSituation div {
    flex-direction: column;
  }

  .main .improveSituation div pre {
    width: 100%;
  }

  .main .improveSituation div .gaugeChartPre {
    width: 50vw;
    height: auto;
  }
}

@media screen and (max-width: 480px) {
  .main .improveSituation div .gaugeChartPre {
    width: 70vw;
    height: auto;
  }
}

</style>
