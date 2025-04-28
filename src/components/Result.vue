<script setup>
// import RadarChart from "./RadarChart.vue";
// import {ref, reactive, watch} from "vue";
// import {ref} from "vue"
import GaugeChart from "@/components/GaugeChart.vue";
import axios from "@/axios/axios.js";
import {reactive, ref} from "vue"

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const questionnaire = Number(sessionStorage.getItem("questionnaire"));
const nationalID = sessionStorage.getItem("nationalID");

let isLoading = ref(false);

let result = reactive({})


axios.get(`questionnaire/${questionnaire}/report/`, {params: {nationalID}})
  .then(res => {
    Object.assign(result, res.data);
    console.log(result)
    isLoading.value = false
  })


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

</script>

<template>
  <div id="pdf-content" class="main" v-if="!isLoading">

    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>

    <div class="finalResult">

      <div class="text">
        <pre>
          {{ result.messages }}
        </pre>
        <!--        <pre>-->
        <!--          &lt;!&ndash;        {{result.messages}}&ndash;&gt;-->
        <!--          "### تحلیل عارضه‌یابی برندینگ شرکت SMALL در حوزه مربوط به هویت برند:-->

        <!--          وضعیت فعلی:-->
        <!--          شرکت SMALL هویت برند خود را به‌طور واضح تعریف کرده است و با مشتریان خود همخوانی دارد، اما-->
        <!--          کارکنان شرکت از هویت برند آگاهی ندارند.-->

        <!--          نقاط قوت:-->
        <!--          - تعریف و ارتباط هویت برند با مشتریان-->
        <!--          - شناخت خودشناسی و ارزش‌های برند توسط مشتریان-->

        <!--          ضعف:-->
        <!--          - عدم آگاهی کارکنان از هویت برند-->
        <!--          - احتمال کاهش ارتباط بین داخلی و خارجی شرکت-->

        <!--          فرصت‌های بهبود:-->
        <!--          1. آموزش و آگاهی‌رسانی کارکنان از هویت برند.-->
        <!--          2. ارتقاء ارتباط داخلی شرکت برای بهبود فرایندها.-->

        <!--          پیشنهادات بهبود:-->
        <!--          1. برگزاری جلسات آموزشی برای کارکنان در مورد هویت برند.-->
        <!--          2. ایجاد یک سیستم ارتباطی موثر بین مدیران و کارکنان.-->
        <!--          3. ترویج مشارکت کارکنان در ایجاد و اجرای هویت برند.-->

        <!--          به طور مثال: می‌توانید با برگزاری جلسات آموزشی ماهیت و ارزش‌های برند را برای کارکنان توضیح-->
        <!--          دهید. این اقدام می‌تواند باعث افزایش آگاهی کارکنان از برند و افزایش مشارکت آن‌ها در-->
        <!--          فعالیت‌های برندینگ شود.-->

        <!--          ### تحلیل عارضه‌یابی برندینگ شرکت SMALL در حوزه مربوط به آگاهی از برند:-->

        <!--          وضعیت فعلی:-->
        <!--          شرکت SMALL تنها مشتریان قدیمی خود را به خوبی شناخته و بر برخی شبکه‌ها فعالیت دارد.-->

        <!--          نقاط قوت:-->
        <!--          - آشنایی مشتریان قدیمی با برند-->
        <!--          - حضور در برخی شبکه‌ها برای جذب مشتریان جدید-->

        <!--          ضعف:-->
        <!--          - عدم آشنایی کلیه مشتریان با برند-->
        <!--          - محدودیت فعالیت در برخی شبکه‌ها-->

        <!--          فرصت‌های بهبود:-->
        <!--          1. گسترش دسترسی به مشتریان جدید از طریق شبکه‌های مختلف.-->
        <!--          2. تقویت آگاهی کلیه مشتریان از برند.-->

        <!--          پیشنهادات بهبود:-->
        <!--          1. ایجاد حضور فعال در شبکه‌های دیجیتالی بیشتر.-->
        <!--          2. برگزاری رویدادها و کمپین‌های تبلیغاتی برای جذب مشتریان جدید.-->
        <!--          3. ایجاد بخشی در وبسایت برای آموزش و ارتباط با مشتریان.-->

        <!--          به طور مثال: با ایجاد حضور فعال در شبکه‌های اجتماعی و به‌روزرسانی محتواها، می‌توانید دسترسی-->
        <!--          به مشتریان جدید را افزایش داده و آگاهی آن‌ها را از برند بالا ببرید."-->
        <!--        </pre>-->
      </div>

      <div class="charts">
        <GaugeChart class="gaugeChart" :value="3.5"></GaugeChart>
      </div>

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

    <button class="saveAndNext" @click="generatePDF">دریافت فایل pdf صفحه</button>
  </div>
  <img v-else class="loader" src="../assets/images/Animation.gif" alt="">
</template>

<style scoped>
.main {
  max-height: max-content;
  width: 75%;
  min-width: 300px;
  background: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95)), url("../assets/images/logo.png") repeat-y center center;
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

.main pre {
  width: 100%;
  text-align: justify;
}

.main .finalResult {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.main .finalResult .charts {
  height: max-content;
}

/*
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
*/
.main .finalText {
  width: 100%;
  text-align: center;
}

.main .finalText a {
  color: black;
  text-decoration: none;
}
</style>
