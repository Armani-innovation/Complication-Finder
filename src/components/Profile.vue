<script setup>
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {watch} from "vue";
import {onMounted} from "vue";
import axios from "../axios/axios.js";

const nationalID = sessionStorage.getItem("nationalID");

function fetchInfos(){
  axios.get("dashboard/All" , {params:{nationalID}}).then(res=>{
    console.log(res)
  })
}

const route = useRoute();
console.log(route.name);

watch(() => route.name, (newName) => {
  console.log(newName);
})

function backward() {
  router.back()
}

onMounted(()=>{
  fetchInfos()
})
</script>

<template>
  <div class="main">
    <div class="header">
      <div class="profile">
        <img src="@/assets/images/user.png" alt="">
        <h3 class="name">نام و نام خانوادگی</h3>
      </div>
    </div>
    <div class="navBar"></div>
    <div class="content"></div>
    <router-link class="link" to="" @click="backward">بازگشت</router-link>
  </div>
</template>

<style scoped>
.main {
  width: 75%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: white;
}

.main .header {
  height: 15vh;
  grid-column: 1 / -1;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: start;
}

.main .header .profile{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.main .header .profile img{
  height: 65%;
}

.main .navBar {
  grid-column: 1/4;
  border: 1px solid;
}

.main .content {
  height: 70vh;
  grid-column: 4/13;
  border: 1px solid;
}

.main .link {
  margin-top: 2vh;
}
</style>
