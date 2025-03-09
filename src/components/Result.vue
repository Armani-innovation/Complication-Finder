<script setup>
import GaugeChart from './GaugeChart.vue'
import RadarChart from "./RadarChart.vue";
import {reactive, ref} from "vue";

const finalResult = JSON.parse(localStorage.getItem("finalResult"))
const domain = sessionStorage.getItem("domain");
const scores = reactive([]);

let improveSituations = ref(null);

const domainIndicators = [
  [
    "تعداد نیروی کار",
    "حفظ کارکنان",
    "بهره وری کارکنان",
    "سیستم ارزیابی عملکرد کارکنان",
    "سیستم آموزش کارکنان",
    "همکاری و کار تیمی",
    "آگاهی ارزشهای اخلاقی"
  ],
  [
    "جریان نقدی عملیاتی",
    "نسبت فعلی",
    "سرمایه در گردش",
    "نرخ سوزی سرمایه",
    "حاشیه سود خالص",
    "گردش حساب های پرداختنی",
    "مجموع هزینه عملکرد مالی",
    "نسبت هزینه فعالیت مالی",
    "گزارش خطاهای مالی",
    "انحراف بودجه",
    "رشد فروش"
  ],
  [
    "برندینگ",
    "شناخت بازار هدف",
    "سوابق فروش",
    "روش‌های فروش و مارکتینگ",
    "کانال‌های توزیع و فروش",
    "سهم بازار",
    "فعالیت‌های صادراتی"
  ],
  [
    "منابع تامین مالی",
    "تحمل ریسک"
  ],
  [
    "نمودار سازمانی",
    "سیستم مدیریت دانش و اطلاعات",
    "سیستم سازماندهی محل کار",
    "مدیریت استراتژی و چشم انداز",
    "تفویض اختیار"
  ],
  [
    "سیستم بازخورد",
    "امکانات",
    "حفظ مشتری"
  ],
  [
    "تولید ماهانه",
    "سیستم مدیریت تولید",
    "فناوری تولید",
    "تولید بازار محور",
    "بهره وری تولید",
    "استانداردهای ملی و بین المللی",
    "گارانتی",
    "سیستم کنترل کیفیت"
  ],
  [
    "بهبود محصول",
    "نوآوری"
  ],
  [
    "مزیت رقابتی"
  ],
]

for (const key in finalResult.results) {
  if (key != "OverallScore") {
    scores.push(finalResult.results[key]);
  }
}

fetch("/improveSituation.json").then((res) => res.json())
  .then((resData) => {
      improveSituations.value = resData[getIndex(domain)]
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

function getIndex(domain) {
  switch (domain) {
    case "human_resources" :
      return 0;
    case "financial_resources" :
      return 1;
    case "sales_and_marketing" :
      return 2;
    case "capital_structure" :
      return 3;
    case "management_organizational_structure" :
      return 4;
    case "customer_relationship_management" :
      return 5;
    case "manufacturing_and_production" :
      return 6;
    case "research_and_development" :
      return 7;
    case "product_competitiveness" :
      return 8;
  }
}

function getDomain(domain) {
  switch (domain) {
    case "human_resources" :
      return "منابع انسانی";
    case "financial_resources" :
      return "منابع مالی";
    case "sales_and_marketing" :
      return "فروش و مارکتینگ";
    case "capital_structure" :
      return "ساختار سرمایه";
    case "management_organizational_structure" :
      return "ساختار مدیریتی و سازمانی";
    case "customer_relationship_management" :
      return "مدیریت ارتباط با مشتری";
    case "manufacturing_and_production" :
      return "ساخت و تولید";
    case "research_and_development" :
      return "تحقیق و توسعه";
    case "product_competitiveness" :
      return "رقابت پذیری محصول";
  }
}
</script>

<template>
  <div class="main">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <h2> گزارش عارضه یابی {{ getDomain(domain) }} <br> <span>شرکت {{
        finalResult.company.name
      }}</span></h2>
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
      <GaugeChart class="gaugeChart" :value="finalResult.results.OverallScore"></GaugeChart>
    </div>

    <RadarChart :keys="domainIndicators[getIndex(domain)]" :values="scores">
    </RadarChart>

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
      شما میتوانید برای دریافت راهنمایی بیشتر و استفاده از نظرات تخصصی مشاوران فروش و مارکتینگ
      شرکت
      دانش بنیان شبکه نوآوری آرمانی با شماره های
      <a href="tel:+982332300357">32300357-023</a>
      یا
      <br>
      <a href="tel:+989046504331">09046504331</a>
      تماس حاصل نمایید.
    </p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: BYekan;
  src: url("./../assets/BYekan+.ttf");
}

.main {
  width: 80%;
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

.main .saveAndNext {
  width: 100%;
  max-width: 200px;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 5vh auto;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.main .saveAndNext:hover {
  background-color: #0056b3;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
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
