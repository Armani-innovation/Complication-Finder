<script setup>
import router from "@/router/index.js";
import {onMounted, reactive, computed} from "vue";
import axios from "../axios/axios.js";
defineEmits(["updateSignIn"])

const is_company = JSON.parse(sessionStorage.getItem("is_company"))
const username = is_company ? sessionStorage.getItem("nationalID") : sessionStorage.getItem("username");

let infos = reactive({
  companies: [],
  history: [],
  mentors: {}
})

function fetchInfos() {
  axios.get("dashboard/All", {params: {is_company, username}}).then(res => {
    Object.assign(infos, res.data)
    console.log(infos.history[0])
  })
}

function backward() {
  router.back()
}

function draftAction(index , domain) {
  console.log(index, domain)
  console.log(infos.history[0][domain][index])
  if (infos.history[0][domain][index].is_draft){
    sessionStorage.setItem("domain", JSON.stringify([`${domain.slice(0,-2)}`, selectedDomain(`${domain.slice(0,-2)}`)]))
    router.push({name:'Questions' , query:{questionNum : 0}})
  }else {
    console.log("draft")
  }
}

function selectedDomain(domain) {
  switch (domain) {
    case "human_resources":
      return 1;
    case "sales_and_marketing" :
      return 2;
    case "branding" :
      return 3;
  }
}

function returnDomain(englishDomain) {
  switch (englishDomain) {
    case "branding_l" :
      return ("برندینگ (شرکت های بزرگ)");
    case "branding_m" :
      return ("برندینگ (شرکت های متوسط)");
    case "branding_s" :
      return ("برندینگ (شرکت های کوچک)");
    case "human_resources_l" :
      return ("منابع انسانی (شرکت های بزرگ)");
    case "human_resources_m" :
      return ("منابع انسانی (شرکت های متوسط)");
    case "human_resources_s" :
      return ("منابع انسانی (شرکت های کوچک)");
    case "sales_and_marketing_l" :
      return ("فروش و مارکتینگ(شرکت های بزرگ)");
    case "sales_and_marketing_m" :
      return ("فروش و مارکتینگ(شرکت های متوسط)");
    case "sales_and_marketing_s" :
      return ("فروش و مارکتینگ(شرکت های کوچک)");

  }
}

const nonEmptyHistories = computed(() => {
  const historyObj = infos.history[0];
  if (!historyObj) return {};

  return Object.fromEntries(
    Object.entries(historyObj).filter(([, arr]) => Array.isArray(arr) && arr.length > 0)
  );
});

onMounted(() => {
  fetchInfos()
})
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="profile">
        <img src="@/assets/images/user.png" alt="">
        <div class="name">
          <h3 class="name">{{
              infos.mentors.name || infos.companies[0]?.name || "در حال بارگذاری..."
            }}</h3>
          <h4 class="nationalId"> {{ is_company ? "شناسه ملی شرکت" : "کد ملی مشاور" }} :
            {{
              infos.mentors.username || infos.companies[0]?.nationalID || "در حال بارگذاری..."
            }} </h4>
        </div>
      </div>
      <div class="setting">
        <font-awesome-icon @click="$emit('updateSignIn')" id="logout" icon="power-off"/>
        <a href="">تماس با ما</a>
      </div>
    </div>
    <div class="content">
      <h3>سوابق عارضه یابی</h3>
      <div class="historyContainer">
        <div class="history" v-for="(history , domain) in nonEmptyHistories" :key="domain">
          <h4>{{returnDomain(domain)}}</h4>
          <div class="items" >
            <div v-for="(item , index) in history" :key="index" @click="draftAction(index , domain)">
              <h4>{{item.date}}</h4>
              <h5> وضعیت : <span :style="{color : item.is_draft ? 'red' : 'green'}"> {{item.is_draft ? "تمام نشده" : "تمام شده"}} </span> </h5>

            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link class="link" to="" @click="backward">بازگشت</router-link>
  </div>
</template>

<style scoped>
.main {
  top: 5vh;
  width: 75%;
  max-height: 90vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: white;
}

.main .header {
  height: 15vh;
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main .header .profile {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.main .header .profile img {
  height: 65%;
}

.main .header .setting {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main .header .setting #logout {
  font-size: 20px;
  color: red;
  cursor: pointer;
}

.main .profile .name {
  display: flex;
  flex-direction: column;
}

.main .content {
  height: 65vh;
  grid-column: 1/-1;
}

.main .content h3 {
  margin: 1vh 0;
  color: red;
}

.main .content .historyContainer {
  width: 100%;
  height: 90%;
  overflow-y: auto;
}

.main .content .historyContainer .history .items {
  width: 100%;
  display: flex;
  overflow-x: auto;
  gap: 1% 1%;
  margin: 2vh 0;
}

.main .content .historyContainer .history .items div {
  min-width: 20vw;
  height: 15vh;
  border: 1px solid red;
  margin-bottom: 1vh;
  cursor: pointer;
}

.main .content .historyContainer .history .items div h5 {
  margin: 1vh;
}

.main .link {
  margin-top: 2vh;
}


a {
  display: inline;
  text-decoration: none;
  color: #0056b3;
  position: relative;
  z-index: 0;
}

a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: 0;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}
</style>
