<script setup>
import GaugeChart from "@/components/GaugeChart.vue";
import RadarChart from "@/components/RadarChart.vue";
import axios from "@/axios/axios.js";
import {onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const questionnaire = Number(sessionStorage.getItem("questionnaire"));
const nationalID = ref("");

let isLoading = ref(true);

let result = reactive({
  overallScore: 0,
  messages: "",
  subdomain_scores: {}
})

let keys = reactive([]);
let values = reactive([]);

let finalMessage = ref("")

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = user.nationalID;
  await getResult();
}

async function getResult() {
  const res = await axios.get(`questionnaire/${questionnaire}/report/`, {params: {nationalID: nationalID.value}})
  await Object.assign(result, res.data);
  for (const score in result.subdomain_scores) {
    keys.push(score)
    values.push(result.subdomain_scores[score])
  }

  finalMessage.value = finalMessage.value.toString().replace("بخش اول گزارش:" , "")
  finalMessage.value = finalMessage.value.toString().replace("بخش دوم گزارش:" , "")
  finalMessage.value = finalMessage.value.toString().split('\n\n')

  // setTimeout(()=>{
  //   isLoading.value = false
  // } , 5000)
  isLoading.value = false
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

onMounted(() => {
  fetchInfos()
})

</script>

<template>
  <div id="pdf-content" class="main" v-if="!isLoading">

    <div class="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>

    <div class="finalResult">

      <div class="textAndChart">

        <GaugeChart class="gaugeChart" :value="result.overallscore" />

        <p>
          {{ finalMessage[0] }} <br>
          {{ finalMessage[1] }} <br>
          {{ finalMessage[2] }}
        </p>

        <!--        <p>-->
        <!--          "بخش اول گزارش: تحلیل عملکرد برندینگ-->

        <!--          در تحلیل عملکرد برندینگ شرکت پوشاک ما، هر حوزه از برندینگ را به شکل جداگانه مورد بررسی-->
        <!--          قرار دادیم-->
        <!--          و تاثیر آن بر عملکرد کلی برند را مورد بررسی قرار دادیم.-->
        <!--          با توجه به پاسخ‌های هر حوزه، نقاط قوت و ضعف برندینگ شرکت به وضوح مشخص شد.-->
        <!--          این تحلیلات به ما کمک کرد تا بهترین راهکارهای بهبود برای هر حوزه را شناخته و پیشنهاد دهیم.-->

        <!--          1. حوزه 1: هویت برند-->
        <!--          تحلیل: هویت برند ما نیاز به افزایش شناخت و تمایز دارد.-->
        <!--          پیشنهاد اول: بهبود بسته بندی محصولات به شکلی که هویت شناخته شده برند را منعکس کند.-->
        <!--          پیشنهاد دوم: استفاده از رنگ‌ها و طرح‌های منحصر به فرد برای ارتقا ارتباط مشتری با برند.-->

        <!--          2. حوزه 2: آگاهی از برند-->
        <!--          تحلیل: آگاهی مشتریان از برند ما نیاز به بالا بردن دارد.-->
        <!--          پیشنهاد اول: افزایش حضور در شبکه‌های اجتماعی و ارتباط فعال با مشتریان.-->
        <!--          پیشنهاد دوم: برگزاری رویدادها و تبلیغات برای افزایش شناخت برند.-->

        <!--          3. حوزه 3: تجربه مشتری-->
        <!--          تحلیل: تجربه مشتریان بهبود بیشتری نیاز دارد.-->
        <!--          پیشنهاد اول: ارتقا سرویس و پشتیبانی به مشتریان برای جلب و افزایش وفاداری.-->
        <!--          پیشنهاد دوم: ایجاد بستری برای دریافت بازخورد مشتریان و بهبود بر اساس آن.-->

        <!--          4. حوزه 4: وفاداری برند-->
        <!--          تحلیل: برند ما نیاز به استراتژی‌های واضح و مستمر برای جلب وفاداری دارد.-->
        <!--          پیشنهاد اول: برنامه‌ریزی سیستماتیک برای برنامه‌های ویژه و پاداش‌های وفاداری.-->
        <!--          پیشنهاد دوم: ارائه تجربه منحصر به فرد به مشتریان برای ایجاد وفاداری بیشتر.-->

        <!--          5. حوزه 5: ارزیابی برند-->
        <!--          تحلیل: نیاز به ارزیابی دقیقتر و استفاده منطقی از داده‌های مشتریان داریم.-->
        <!--          پیشنهاد اول: انجام ارزیابی‌های دقیقتر و بهبود‌ها برمبنای داده‌های تجربه مشتریان.-->
        <!--          پیشنهاد دوم: ایجاد سیستم پیشرفته‌تر برای جمع‌آوری و تحلیل داده‌های مشتریان.-->

        <!--          6. حوزه 6: استراتژی برند-->
        <!--          تحلیل: نیاز به استراتژی‌های بازنگری و به‌روزرسانی در زمینه برندینگ داریم.-->
        <!--          پیشنهاد اول: ایجاد برنامه استراتژیک برای به‌روزرسانی و ماندگاری برند.-->
        <!--          پیشنهاد دوم: افزایش سرمایه‌گذاری‌های مداوم در استراتژی برند.-->

        <!--          7. حوزه 7: نوآوری در برندینگ-->
        <!--          تحلیل: نیاز به نوآوری منظم و مطابق استراتژی برای برند داریم.-->
        <!--          پیشنهاد اول: ایجاد فرآیندهای منظم برای نوآوری و بهبود‌های درون‌سازمانی.-->
        <!--          پیشنهاد دوم: ایجاد تیم خلاقیت برای ایده‌پردازی و اجرا در زمینه برندینگ.-->

        <!--          بخش دوم گزارش: تحلیل منحصر به فرد هر حوزه به همراه پیشنهادات منحصر به فرد-->

        <!--          1. حوزه 1: هویت برند-->
        <!--          تحلیل: هویت برند فعلی با نام تجاری متناسب است ولی نیاز به استفاده هوشمندانه تر از رنگ‌ها و-->
        <!--          طرح‌ها دارد.-->
        <!--          پیشنهاد اول: ایجاد یک لوگو منحصر به فرد و قابل ارتباط با محصولات.-->
        <!--          به طور مثال: طراحی یک بسته بندی تازه و جذاب برای لباس‌های فصلی.-->

        <!--          2. حوزه 2: آگاهی از برند-->
        <!--          تحلیل: حضور در شبکه‌های اجتماعی ما باید بهبود یابد و استراتژی برند ما باید به خوبی به-->
        <!--          مشتریان منتقل شود.-->
        <!--          پیشنهاد اول: ارائه محتوای مفید و جذاب در رسانه‌های اجتماعی.-->
        <!--          به طور مثال: برگزاری قرعه‌کشی‌ها و مسابقات معرفی برند.-->

        <!--          3. حوزه 3: تجربه مشتری-->
        <!--          تحلیل: نیاز به ارتقای سرویس به مشتریان و دریافت بازخورد بهتر برای ارتقاء تجربه مشتری-->
        <!--          داریم.-->
        <!--          پیشنهاد اول: تشویق به بازخورد فعال مشتریان و استفاده از آن‌ها برای بهبود فرایندها.-->
        <!--          به طور مثال: سیستم پاداش برای ارائه بازخورد بهتر.-->

        <!--          4. حوزه 4: وفاداری برند-->
        <!--          تحلیل: نیاز به برنامه‌ریزی منظم و اجرای پاداش‌های وفاداری مناسب برای جلب بیشتر وفاداری-->
        <!--          مشتریان داریم.-->
        <!--          پیشنهاد اول: برگزاری رویدادهای ویژه برای مشتریان دائمی.-->
        <!--          به طور مثال: ارائه تخفیف‌های ویژه به مشتریان با سابقه.-->

        <!--          5. حوزه 5: ارزیابی برند-->
        <!--          تحلیل: استفاده ناکافی از داده‌های مشتریان برای بهبود برند.-->
        <!--          پیشنهاد اول: راه‌اندازی سیستم جامع برندینگ با تحلیل داده‌های دقیق.-->
        <!--          به طور مثال: مدیریت سیستمی رتبه‌بندی مشتریان براساس تجربه‌های آن‌ها.-->

        <!--          6. حوزه 6: استراتژی برند-->
        <!--          تحلیل: نیاز به تدوین استراتژی‌های مطابق با هدف و منطق و مستند است.-->
        <!--          پیشنهاد اول: ایجاد یک گفتمان و مستندات برند برای استراتژی‌های آینده.-->
        <!--          به طور مثال: برگزاری جلسات دوره‌ای برای بازبینی و ارزیابی استراتژی‌های برند.-->

        <!--          7. حوزه 7: نوآوری در برندینگ-->
        <!--          تحلیل: نیاز به نوآوری هدفمند و منظم برای ایجاد ارزش افزوده برند داریم.-->
        <!--          پیشنهاد اول: ایجاد یک تیم مخصوص برای ایده‌پردازی و ارزیابی نوآوری‌ها.-->
        <!--          به طور مثال: برگزاری هفته‌های خلاقیت برای پیشنهاد ایده‌های نوین.-->

        <!--          با این تحلیلات و پیشنهادات من، شرکت شما می‌تواند برند خود را تقویت کرده و رشد بیشتری در-->
        <!--          صنعت پوشاک داشته باشد. همچنین، بهترین راهکارها و استراتژی‌ها برای هر حوزه با توجه به شرایط-->
        <!--          و نیازهای شرکت شما معرفی شده است. این پیشنهادات می‌تواند به بهبود و توسعه مداوم برند شما-->
        <!--          کمک کند."-->
        <!--        </p>-->

      </div>

      <hr>

      <div class="chartAndResults">
        <RadarChart class="radarChart" :values="values" :keys="keys"/>
        <br>
        <p v-for="(result , index) in finalMessage" :key="result">
          {{ index > 2 ? result : ""}}
        </p>
      </div>

      <!-- <div class="charts">
        <GaugeChart class="gaugeChart" :value="result.overallscore" />
        <br><br><br>
        <RadarChart :values="values" :keys="keys"/>
      </div> -->

    </div>

    <router-link class="saveAndNext" to="/domains">
      ادامه عارضه یابی
    </router-link>

    <p class="finalText">
      شما می‌توانید برای دریافت راهنمایی بیشتر و استفاده از نظرات تخصصی مشاوران فروش و
      مارکتینگ
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

.main .finalResult {
  width: 100%;
  height: max-content;
}

.main .finalResult .textAndChart {
  width: 100%;
  display: flex;
}

.main .finalResult .textAndChart .gaugeChart {
  width: 30%;
}

.main .finalResult .textAndChart p {
  max-width: 70%;
}

/*.main .finalResult .text pre {
  max-width: 100%;
  text-align: justify;
}*/

/*.main .finalResult .charts {
  height: max-content;
}*/

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
