<script setup>
import {ref, watch} from "vue";
import {useRoute} from 'vue-router'
import router from "@/router/index.js";

const description = ref(null);
const user = ref(null);
const infos = ref(null);
const complication = ref(null);
const credits = ref(null);
const result = ref(null);
const route = useRoute();
let status = ref("حوزه عارضه یابی");

watch(() => route.name, (newName) => {
  console.log(newName);
  switch (newName) {
    case "Welcome" :
      welcome()
      break;
    case "SignIn" :
      User()
      break;
    case "SignUp" :
      User()
      break;
    case "CompanyInfo" :
      status.value = "اطلاعات شرکت"
      companyInfo();
      break;
    case "Domain" :
      companyInfo();
      break;
    case "Questions" :
      questions()
      break;
    case "PayPage" :
      payPage()
      break;
    case "Result" :
      finalResult()
      break;
    case "Profile" :
      break;
  }
})

function welcome() {
  description.value.classList.add("now")
  description.value.classList.remove("passed")

  user.value.classList.remove("now")
  user.value.classList.remove("passed")

  infos.value.classList.remove("now")
  infos.value.classList.remove("passed")

  complication.value.classList.remove("now")
  complication.value.classList.remove("passed")

  credits.value.classList.remove("now")
  credits.value.classList.remove("passed")

  result.value.classList.remove("now")
}

function User() {
  description.value.classList.add("passed")
  description.value.classList.remove("now")

  user.value.classList.add("now")
  user.value.classList.remove("passed")

  infos.value.classList.remove("now")
  infos.value.classList.remove("passed")

  complication.value.classList.remove("now")
  complication.value.classList.remove("passed")

  credits.value.classList.remove("now")
  credits.value.classList.remove("passed")

  result.value.classList.remove("now")
}

function companyInfo() {
  description.value.classList.add("passed")
  description.value.classList.remove("now")

  user.value.classList.add("passed")
  user.value.classList.remove("now")

  infos.value.classList.add("now")
  infos.value.classList.remove("passed")

  complication.value.classList.remove("now")
  complication.value.classList.remove("passed")

  credits.value.classList.remove("now")
  credits.value.classList.remove("passed")

  result.value.classList.remove("now")
}

function questions() {
  description.value.classList.add("passed")
  description.value.classList.remove("now")

  user.value.classList.add("passed")
  user.value.classList.remove("now")

  infos.value.classList.add("passed")
  infos.value.classList.remove("now")

  complication.value.classList.add("now")
  complication.value.classList.remove("passed")

  credits.value.classList.remove("now")
  credits.value.classList.remove("passed")

  result.value.classList.remove("now")
}

function payPage() {
  description.value.classList.add("passed")
  description.value.classList.remove("now")

  user.value.classList.add("passed")
  user.value.classList.remove("now")

  infos.value.classList.add("passed")
  infos.value.classList.remove("now")

  complication.value.classList.add("passed")
  complication.value.classList.remove("now")

  credits.value.classList.add("now")
  credits.value.classList.remove("passed")

  result.value.classList.remove("now")
}

function finalResult() {
  description.value.classList.add("passed")
  description.value.classList.remove("now")

  user.value.classList.add("passed")
  user.value.classList.remove("now")

  infos.value.classList.add("passed")
  infos.value.classList.remove("now")

  complication.value.classList.add("passed")
  complication.value.classList.remove("now")

  credits.value.classList.add("passed")
  credits.value.classList.remove("now")

  result.value.classList.add("now")
}
</script>

<template>
  <div class="main">
    <ul>
      <li class="" ref="description" @click="router.push('/')">
        <img ref="description" src="../assets/icons/Description.svg" alt="">
        <h4 class="title" ref="descriptionTitle">معرفی عارضه یاب</h4>
      </li>
      <li class="" ref="user" @click="router.push('/SignIn')" value="ثبت نام / ورود">
        <img ref="user" src="../assets/icons/SignIn-Up.svg" alt="">
        <h4 class="title" ref="userTitle">ثبت نام / ورود</h4>
      </li>
      <li class="" ref="infos" @click="router.push('/domains')">
        <img ref="infos" src="../assets/icons/Domains.svg" alt="">
        <h4 class="title" ref="infosTitle"> {{ status }} </h4>
      </li>
      <li class="" ref="complication" @click="router.push('/questions')">
        <img ref="complication" src="../assets/icons/Questions.svg" alt="">
        <h4 class="title" ref="complicationTitle">سوالات عارضه یابی</h4>
      </li>
      <li class="" ref="credits" @click="router.push('/PayPage')">
        <img ref="credits" src="../assets/icons/PayPage.svg" alt="">
        <h4 class="title" ref="creditsTitle">پرداخت</h4>
      </li>
      <li class="" ref="result" @click="router.push('/result')">
        <img ref="result" src="../assets/icons/Results.svg" alt="">
        <h4 class="title" ref="resultTitle">گزارش نهایی</h4>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0;
  border-bottom-right-radius: 60px;
  border-bottom-left-radius: 60px;
  padding: 0;
  top: 74px;
  position: fixed;
  box-shadow: 0 0 rgba(0, 0, 0, 0);
}

.main ul {
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.main ul li {
  width: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  opacity: 0.5;
}

.main ul li .title {
  font-size: 1vw;
}

.main ul li img{
  width: 85%;
}

.main ul li .link {
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main ul .now {
  opacity: 1;
}

.main ul .passed {
  opacity: 1;
}

@media screen and (max-width: 1279px) {
  .main {
    width: 85%;
    top: 59px;
  }
  .main ul li .title {
    font-size: 1.4vw;
  }
}

@media screen and (max-width: 768px) {
  .main {
    top: 40px;
  }
}

@media screen and (max-width: 480px) {

}
</style>
