<script setup>
import GaugeChart from "@/components/GaugeChart.vue";
import RadarChart from "@/components/RadarChart.vue";
// import axios from "@/axios/axios.js";
import {onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// const questionnaire = Number(sessionStorage.getItem("questionnaire"));
const nationalID = ref("");

let isLoading = ref(true);

let result = reactive({
  overallScore: 2.5,
  messages: "",
  subdomain_scores: {}
})

// let keys = reactive([]);
// let values = reactive([]);
let keys = reactive(["هویت برند", "آگاهی از برند", "تجربه مشتری", "وفاداری برند", "ارزیابی برند", "استراتژی برند", "نوآوری در برندینگ"]);
let values = reactive([2, 2.5, 3, 1.5, 4, 2, 3.4]);

let finalMessage = ref("بخش اول گزارش: تحلیل عملکرد برندینگ \n\nشرکت در حوزه پوشاک با توجه به پاسخ های داده شده در پرسشنامه، در برخی از حوزه های برندینگ عملکرد مطلوبی نداشته است. در حوزه هویت برند، ظاهرا برند به خوبی با ماهیت کسب و کار همخوانی ندارد و مشتریان به سختی هویت و ماهیت برند را تشخیص می دهند. در حوزه آگاهی از برند، برند در بازار شناخته شده است اما هنوز به انتخاب اول مشتریان تبدیل نشده است. حضور شرکت در شبکه های اجتماعی محدود بوده و ارتباط منظمی با مخاطبان وجود ندارد. در حوزه تجربه مشتری، تجربه مشتریان مثبت گزارش شده اما نیاز به بهبود دارد. در حوزه وفاداری برند، برنامه هایی برای افزایش وفاداری مشتریان وجود دارد اما به طور منظم اجرا نمی شود. در حوزه ارزیابی برند، ارزیابی خیلی محدود صورت می گیرد و کمتر از نیمی از داده های مشتریان در جهت بهبود مورد استفاده قرار می گیرد. در حوزه استراتژی برند، استراتژی برند کاملاً مشخص و مستند است اما به روزرسانی نمی شود. در حوزه نوآوری در برندینگ، نوآوری به صورت تصادفی و بدون برنامه انجام می شود.\n\nبخش دوم گزارش: تحلیل منحصر به فرد هر حوزه به همراه پیشنهادات منحصر به فرد\n\nحوزه 1: هویت برند\n\nتحلیل: هویت برند شرکت به نظر می رسد که با ماهیت کسب و کار همخوانی ندارد. این می تواند به این دلیل باشد که عناصر قابل رویت برند مانند رنگ، طراحی و لوگو با ماهیت کسب و کار هماهنگ نیستند.\n\nپیشنهاد اول: برای بهبود هویت برند، می توانید بر روی طراحی مجدد لوگو، رنگ و سایر عناصر قابل رویت برند کار کنید. به طور مثال، اگر شرکت شما در حوزه پوشاک زنانه فعالیت می کند، می توانید رنگ هایی را انتخاب کنید که بیشتر به دل زنان بیافتد.\n\nپیشنهاد دوم: برای ایجاد هماهنگی بیشتر بین هویت برند و ماهیت کسب و کار، می توانید بر روی توسعه یک داستان برند کار کنید که می تواند مشتریان را به برند شما وصل کند. به طور مثال، اگر شرکت شما بر روی تولید پوشاک با استفاده از مواد بازیافتی تمرکز دارد، می توانید این موضوع را به عنوان یک بخش از داستان برند خود ارائه دهید.\n\nحوزه 2: آگاهی از برند\n\nتحلیل: برند شما در بازار شناخته شده است اما هنوز به انتخاب اول مشتریان تبدیل نشده است. این نشان می دهد که برند شما نیاز به افزایش آگاهی و حضور بیشتر در ذهن مشتریان دارد.\n\nپیشنهاد اول: برای افزایش آگاهی از برند، می توانید بر روی تبلیغات بیشتر در شبکه های اجتماعی و سایر پلتفرم های آنلاین کار کنید. به طور مثال، می توانید از تبلیغات پرداخت شده در فیس بوک و اینستاگرام استفاده کنید.\n\nپیشنهاد دوم: برای افزایش حضور برند در ذهن مشتریان، می توانید از تکنیک های مختلف بازاریابی محتوا استفاده کنید. به طور مثال، می توانید بلاگ ها، مقالات، ویدئوها و اینفوگرافیک ها را به عنوان بخشی از استراتژی محتوای خود ایجاد کنید.\n\nحوزه 3: تجربه مشتری\n\nتحلیل: تجربه مشتریان شما مثبت گزارش شده اما نیاز به بهبود دارد. این نشان می دهد که شما باید بر روی ارائه یک تجربه مشتری بهتر تمرکز کنید.\n\nپیشنهاد اول: برای بهبود تجربه مشتری، می توانید بر روی ارائه خدمات پس از فروش بهتر کار کنید. به طور مثال، می توانید یک سیستم پشتیبانی مشتری ایجاد کنید که مشتریان را در طول فرآیند خرید و پس از آن پشتیبانی کند.\n\nپیشنهاد دوم: برای ایجاد یک تجربه خرید بهتر، می توانید بر روی بهبود طراحی وب سایت یا فروشگاه آنلاین خود کار کنید. به طور مثال، می توانید از رنگ ها، تصاویر و طراحی هایی استفاده کنید که به مشتریان کمک کند به راحتی محصولات مورد نظر خود را پیدا کنند.\n\nحوزه 4: وفاداری برند\n\nتحلیل: برنامه هایی برای افزایش وفاداری مشتریان به برند وجود دارد اما به طور منظم اجرا نمی شود. این نشان می دهد که شما باید بر روی اجرای منظم این برنامه ها تمرکز کنید.\n\nپیشنهاد اول: برای افزایش وفاداری مشتریان، می توانید برنامه امتیازات مشتری را ایجاد کنید. به طور مثال، می توانید به مشتریان امتیازاتی بدهید که می توانند آنها را برای تخفیف در خرید های بعدی استفاده کنند.\n\nپیشنهاد دوم: برای افزایش وفاداری مشتریان، می توانید بر روی ارائه خدمات ویژه به مشتریان وفادار تمرکز کنید. به طور مثال، می توانید به مشتریان وفادار خود دسترسی ویژه به محصولات جدید یا تخفیف های ویژه بدهید.\n\nحوزه 5: ارزیابی برند\n\nتحلیل: ارزیابی خیلی محدود از عملکرد برند صورت می گیرد و کمتر از نیمی از داده های مشتریان در جهت بهبود مورد استفاده قرار می گیرد. این نشان می دهد که شما باید بر روی ارزیابی منظم و استفاده بهتر از داده های مشتری تمرکز کنید.\n\nپیشنهاد اول: برای بهبود ارزیابی برند، می توانید بر روی ایجاد یک سیستم ارزیابی منظم کار کنید. به طور مثال، می توانید هر سه ماه یک بار یک ارزیابی کامل از عملکرد برند انجام دهید.\n\nپیشنهاد دوم: برای استفاده بهتر از داده های مشتری، می توانید از ابزارهای تحلیل داده استفاده کنید. به طور مثال، می توانید از ابزارهای تحلیل داده مانند Google Analytics برای درک بهتر رفتار مشتریان و عملکرد برند خود استفاده کنید.\n\nحوزه 6: استراتژی برند\n\nتحلیل: استراتژی برند شما کاملاً مشخص و مستند است اما به روزرسانی نمی شود. این نشان می دهد که شما باید بر روی به روزرسانی منظم استراتژی برند خود تمرکز کنید.\n\nپیشنهاد اول: برای به روزرسانی استراتژی برند، می توانید بر روی بررسی منظم بازار و رقبا تمرکز کنید. به طور مثال، می توانید هر سه ماه یک بار بازار و رقبا را بررسی کنید و استراتژی برند خود را بر اساس نتایج به روزرسانی کنید.\n\nپیشنهاد دوم: برای به روزرسانی استراتژی برند، می توانید بر روی دریافت بازخورد مشتریان تمرکز کنید. به طور مثال، می توانید از نظرسنجی ها، گروه های مرور و داده های مشتری برای دریافت بازخورد مشتریان و به روزرسانی استراتژی برند خود استفاده کنید.\n\nحوزه 7: نوآوری در برندینگ\n\nتحلیل: نوآوری در برندینگ به صورت تصادفی و بدون برنامه انجام می شود. این نشان می دهد که شما باید بر روی ایجاد یک برنامه منظم برای نوآوری در برندینگ تمرکز کنید.\n\nپیشنهاد اول: برای نوآوری در برندینگ، می توانید بر روی ا")
let message = reactive([]);
let secondPartMessage = reactive([]);

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const user = await getTokenInfo(token);
  nationalID.value = user.nationalID;
  await getResult();
}

async function getResult() {
  // const res = await axios.get(`questionnaire/${questionnaire}/report/`, {params: {nationalID: nationalID.value}})
  // console.log(res.data)
  // finalMessage.value = res.data.messages;
  // await Object.assign(result, res.data);
  // for (const score in result.subdomain_scores) {
  //   keys.push(score)
  //   values.push(result.subdomain_scores[score])
  // }

  finalMessage.value = finalMessage.value.toString().replace("\u200c", " ");
  finalMessage.value = finalMessage.value.toString().replace("بخش اول گزارش:", "");
  message = finalMessage.value.toString().split('بخش دوم گزارش:');
  secondPartMessage = message[1].toString().split(/(?=حوزه \d+)/g)


  setTimeout(()=>{
    isLoading.value = false
  } , 5000)

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
        <div>
          <p>
            {{ message[0] }}
          </p>
        </div>
        <GaugeChart class="gaugeChart" :value="result.overallScore"/>
      </div>

      <div class="chartAndResults">
        <RadarChart class="radarChart" :values="values" :keys="keys"/>
        <br>
        <div v-for="(message , index) in secondPartMessage" :key="message">
          <p>
            {{ message }}
          </p>
          <hr v-if="index !== 0 && index !== secondPartMessage.length-1">
        </div>
      </div>

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

.main .finalResult .textAndChart div {
  max-width: 70%;
}

.main .finalResult p {
  white-space: pre-line;
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
