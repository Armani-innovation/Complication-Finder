<script setup>
import {ref, watch, reactive} from "vue";
import {useRoute} from 'vue-router'
import router from "@/router/index.js";
// import {sessionToken} from "@/composables/composable.js";
import {getTokenInfo} from "@/composables/composable.js";

const description = ref(null);
const user = ref(null);
const infos = ref(null);
const complication = ref(null);
const credits = ref(null);
const result = ref(null);
const name = ref("");
const route = useRoute();

let info = reactive({})

let status = ref("حوزه عارضه یابی");

watch(sessionStorage.getItem("token"), async (newToken) => {
  console.log(Boolean(newToken))
  info = await getTokenInfo(newToken)
  name.value = info.name;
})

async function fetchInfo() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  if (infos) {
    name.value = infos.name;
  } else {
    name.value = "";
  }
}

watch(() => route.name, (newName) => {
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
  fetchInfo()
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
  fetchInfo()
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
  fetchInfo()
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
  fetchInfo()
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

function routeProfile() {
  router.push('/Profile')
}

</script>

<template>
  <div class="main">

    <div class="header" v-if="route.name !== 'Profile' && route.name !== 'ComplicationHistory'">
      <div class="empty" v-if="!name"></div>
      <div class="userName" v-if="name" @click="routeProfile">
        <font-awesome-icon class="icon" icon="user"/>
        <h3>{{ name }}</h3>
      </div>
      <h1 class="title">پلتفرم عارضه یابی شرکت شبکه نوآوری آرمانی</h1>
      <div class="empty"></div>
    </div>

    <ul>
      <li class="" ref="description" @click="router.push('/')">
        <img ref="description" src="../assets/icons/Description.svg" alt="">
        <h4 class="title" ref="descriptionTitle">معرفی عارضه یاب</h4>
      </li>
      <li class="" ref="user" @click="router.push('/SignIn')" value="ثبت نام / ورود">
        <img ref="user" src="../assets/icons/SignIn-Up.svg" alt="">
        <h4 class="title" ref="userTitle">ثبت نام / ورود</h4>
      </li>
      <li style="cursor: default" class="" ref="infos">
        <img ref="infos" src="../assets/icons/Domains.svg" alt="">
        <h4 class="title" ref="infosTitle"> {{ status }} </h4>
      </li>
      <li style="cursor: default" class="" ref="complication">
        <img ref="complication" src="../assets/icons/Questions.svg" alt="">
        <h4 class="title" ref="complicationTitle">سوالات عارضه یابی</h4>
      </li>
      <li style="cursor: default" class="" ref="credits">
        <img ref="credits" src="../assets/icons/PayPage.svg" alt="">
        <h4 class="title" ref="creditsTitle">پرداخت</h4>
      </li>
      <li style="cursor: default" class="" ref="result">
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0 0 60px 60px;
  padding: 0;
  box-shadow: 0 0 rgba(0, 0, 0, 0);
  margin: 0 auto;
}

.main .title {
  text-align: center;
  font-size: 28px;
}

.main .header {
  width: 100%;
  margin: 0 auto;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: black;
}

.main .header h1 {
  margin: 0;
}

.main .header .userName {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 3vw;
}

.main .header .userName .icon {
  font-size: 22px;
}

.main .header .userName h3 {
  margin-right: 1vw;
  font-size: 20px;
}

.main .header .userName img {
  border-radius: 50%;
  width: 4vw;
  aspect-ratio: 1/1;
  margin: 0;
}

.main .header .empty {
  width: 10vw;
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

.main ul li img {
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
    width: 90%;
  }
}

@media screen and (max-width: 768px) {
  .main {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {

}
</style>
