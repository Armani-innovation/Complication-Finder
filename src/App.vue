<script setup>
import {provide, ref} from "vue";
import Status from "@/components/Status.vue";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";

const name = ref("")
let isSignedIn = ref(false);
let profileRouted = ref(false);

async function fetchUser() {

  isSignedIn.value = true;
  const delay = 2000;
  const retries = 3;
  const id = sessionStorage.getItem("id");

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.get("register/", {params: {id}});
      name.value = res.data.name;
      return res.data.is_company;
    } catch {

      if (attempt === retries) {
        throw new Error("خطا در دریافت اطلاعات کاربر.");
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

}

if (sessionStorage.getItem("id")) {
  fetchUser();
}

function routeProfile() {
  router.push('/Profile')
  showStatus()
}

function showStatus() {
  profileRouted.value = !profileRouted.value;
}

provide("fetchUser", fetchUser);
provide("showStatus", showStatus);
</script>

<template>
  <div class="container">

    <video class="background-video" autoplay loop muted playsinline>
      <source src="./assets/1.mp4" type="video/mp4"/>
      مرورگر شما از ویدئوی HTML5 پشتیبانی نمی‌کند.
    </video>

    <div class="header">
      <div class="empty" v-if="!isSignedIn"></div>
      <div class="userName" v-if="name" @click="routeProfile">
        <font-awesome-icon class="icon" icon="user" />
        <h3>{{ name }}</h3>
      </div>
      <h1 class="title">پلتفرم عارضه یابی شرکت شبکه نوآوری آرمانی</h1>
      <div class="empty"></div>
    </div>
    <Status v-if="!profileRouted" class="status"/>
    <RouterView/>
    <img class="logo" src="./assets/logo1.png" alt="">
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: -1;
}

.container .header {
  margin: 0 auto;
  width: 70%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  position: fixed;
  background-color: white;
}

.container .header h1{
  margin: 0;
}

.container .logo {
  aspect-ratio: 1 / 1.1;
  width: 6vw;
  position: absolute;
  left: 5vw;
  bottom: 5vh;
  z-index: 1;
}

.container .title {
  text-align: center;
  color: black;
}

.container .header .userName {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 3vw;
}

.container .header .userName .icon{
  font-size: 16px;
}

.container .header .userName h3 {
  color: black;
  margin-right: 1vw;
}

.container .header .userName img {
  border-radius: 50%;
  width: 4vw;
  aspect-ratio: 1/1;
  margin: 0;
}

.container .header .empty {
  width: 10vw;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

@media screen and (max-width: 480px) {
  .status {
    display: none;
  }
}
</style>
