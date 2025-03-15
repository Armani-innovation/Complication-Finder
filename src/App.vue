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
    <h1 class="title">پلتفرم عارضه یابی شرکت شبکه نوآوری آرمانی</h1>
    <div class="userName" v-if="name">
      <img src="./assets/user.png" alt="">
      <h3>{{ name }}</h3>
    </div>
    <Status class="status"/>
    <RouterView/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container .title {
  margin: 5vh 0;
  text-align: center;
}

.container .userName {
  width: 80%;
  display: flex;
  align-items: center;
}
.container .userName img {
  border-radius: 50%;
  width: 4vw;
  aspect-ratio: 1/1;
  margin: 0 1vw;
}

@media screen and (max-width: 480px) {
  .status {
    display: none;
  }
}
</style>
