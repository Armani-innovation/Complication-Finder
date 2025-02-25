<script setup>
import {reactive, ref} from "vue";
import { useCompanyStore } from "./../stores/counter.js";
import router from "@/router/index.js";

const companyStore = useCompanyStore();

const data = reactive({
  company : {
    name: "",
    registrationNumber: "",
    nationalID: ""
  }
})

let companyName = ref("");
let companyNationalID = ref("");
let companyTrademark = ref("");

let isFilled = ref(false);

function savaAndNext() {
  if (!(companyName.value && companyNationalID.value && companyTrademark.value)) {
    isFilled.value = true;
  } else {
    isFilled.value = false;
    data.company.name = companyName.value;
    data.company.registrationNumber = companyNationalID.value;
    data.company.nationalID = companyTrademark.value;
    router.push("/domains");
    companyStore.setCompany(data);
  }
}

</script>
<template>
  <div class="main">
    <h3>سلام</h3>
    <h4>به پلتفرم عارضه یاب شرکت دانش بنیان شبکه نوآوری آرمانی خوش اومدین</h4>
    <p class="foreword">
      موفقیت سازمان در دستیابی به اهداف خود به عوامل متعددی بستگی دارد. باتوجه به پویایی حاصل از
      سرعت رشد علم و تکنولوژی در محیط کسب و کار ، سازمان‌ها برای سنجش عملکرد و آگاهی از جایگاه خود
      در بازار، باید بصورت پیوسته بر اساس سیستم‌های کنترلی، خود را مورد ارزیابی قرار دهند. در درسترس
      بودن شبکه‌های مجازی، گستردگی بستر تبلیغات، فراهم بودن امکانات آموزشی و ... سطح آگاهی و
      انتظارات مشتریان‌را افزایش داده‌است. باتوجه به رقابتی‌بودن فضای بازار، در صورت عدم شناسایی
      نقاط ضعف در زمان مناسب و برنامه‌ریزی برای برطرف نمودن آن‌ها، محصولات و خدمات رقبا جایگزین
      محصولات شرکت شده و با از دست‌رفتن اعتماد مشتریان، شرکت با کاهش سهم بازار و در نتیجه کاهش درآمد
      رو به رو خواهدشد. در این حالت بقای شرکت در بازار رقابتی از هر زمان دیگری سخت‌تر شده و خطر
      ورشکستگی بیش از پیش سازمان‌را تهدید خواهدکرد.
      <br>
      شرکت‌ها برای هماهنگی با نیازهای متغیر مشتریان، می‌بایست با تعریف پروژه‌های جدید و یا مهندسی
      مجدد فرآیندها، خدمات و محصولات جدید را با حداقل نقاط ضعف ارائه دهند. بدین منظور شرکت نیازمند
      ارزیابی آمادگی خود برای اجرای تغییرات می‌باشد. انجام یک ارزیابی آمادگی پدید آورنده‌ی این دانش
      و اطمینان است که آیا تلاش‌های شرکت برای انجام یک پروژه کاری خاص موفقیت‌آمیز خواهدبود یا خیر.
      ارزیابی سازمانی از یک شکست بالقوه شرکت در پروژه‌ای که آماده تکمیل آن نبوده است جلوگیری کرده و
      از این راه به حفظ اعتبار شرکت شما کمک می‌کند. انجام یک ارزیابی کلی سازمانی بخشی از برنامه‌ریزی
      استراتژیک می‌باشد. بررسی نقاط قوت و ضعف داخلی و همچنین تهدیدها و فرصت های بیرونی قبل از بررسی
      دقیق ماموریت و چشم انداز و اهداف آینده ضروری است.
      <br>
      شرکت شبکه نوآوری و فناوری آرمانی صبا با هدف ارائه خدمات به شرکت های دانش بنیان ، فناور و خلاق
      زیست بوم فناوری کشور، با استفاده از کارشناسان حوزه کسب و کار، با طراحی الگوی ارزیابی
      منحصربه‌فرد و تخصصی، در بهبود و توسعه شرکت‌ شما در کنارتان خواهد بود.
      <br> <br>
      محمد واعظیان
      <br>
      مدیرعامل شرکت شبکه نوآوری و فناوری آرمانی صبا
    </p>
    <h4>اطلاعات شرکت :</h4>
    <ul>
      <li><input type="text" placeholder="نام شرکت" v-model="companyName"/></li>
      <li><input type="text" placeholder="شناسه ملی شرکت" v-model="companyNationalID"/></li>
      <li><input type="text" placeholder="شماره ثبت علامت تجاری" v-model="companyTrademark"/></li>
      <li><input type="text" placeholder="حوضه کاری شرکت"/></li>
    </ul>
    <p class="error" v-if="isFilled">لطفا تمام فیلد ها رو پر کنین</p>
    <RouterLink @click="savaAndNext" to="">
      <button class="saveAndNext">
        ذخیره و بعدی
      </button>
    </RouterLink>
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

.main p {
  text-align: justify;
}

.main h4 , h3 {
  margin: 0;
}

.main pre {
  font-family: "B Yekan", cursive;
}

.main ul {
  width: 90%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  margin: 6vh auto 2vh auto;
  padding-bottom: 20vh;
  grid-gap: 3vh 1vw;
}

.main ul li {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main ul li input {
  font-family: "B Yekan", cursive;
  outline: none;
  width: 90%;
  height: 100%;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  padding: 0 5%;
  background-color: #f4f5f7;
  font-size: 13px;
}

.main .error {
  color: red;
  margin-right: 3vw;
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
