<script setup>
import {provide, ref} from "vue";
import Status from "@/components/Status.vue";
import axios from "@/axios/axios.js";

const name = ref("")

async function fetchUser() {

  const delay = 2000 ;
  const retries = 3 ;
  const id = sessionStorage.getItem("id");

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.get("register/", { params: { id } });
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

if (sessionStorage.getItem("id")){
  fetchUser();
}

provide("fetchUser", fetchUser);
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">پلتفرم عارضه یابی شرکت شبکه نوآوری آرمانی</h1>
    </div>
    <div class="userName" v-if="name">
      <img src="./assets/user.png" alt="">
      <h3>{{ name }}</h3>
    </div>
    <Status class="status"/>
    <RouterView/>
    <img src="./assets/logo1.png" alt="">
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.container .header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container img{
  aspect-ratio: 1 / 1.1;
  width: 6vw;
  position: absolute;
  left: 5vw;
  bottom: 5vh;
}

.container .title {
  margin: 5vh 0;
  text-align: center;
  color: white;
}

.container .userName {
  width: 90%;
  display: flex;
  align-items: center;
}
.container .userName img {
  border-radius: 50%;
  width: 4vw;
  aspect-ratio: 1/1;
  margin: 0 ;
}

@media screen and (max-width: 480px) {
  .status {
    display: none;
  }
}
</style>
