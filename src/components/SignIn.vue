<script setup>
import {inject, reactive, ref} from "vue"
import axios from "@/axios/axios.js";
import {jwtDecode} from "jwt-decode";
import router from "@/router/index.js";

const isLoading = ref(false);
let errMessage = ref("");
let formData = reactive({
  username: "",
  password: "",
})

async function subform() {
  try {
    isLoading.value = true;
    const res = await axios.post("token/", formData);
    const token = res.data.access;
    const decoded = jwtDecode(token);
    sessionStorage.setItem("id", decoded.user_id);
    const isCompany = await fetchUser();
    isLoading.value = false;
    if (isCompany) {
      await router.push("/domains");
    } else {
      await router.push("/CompanyInfo");
    }
  } catch {
    isLoading.value = false;
    errMessage.value = "نام کاربری یا رمز عبور اشتباه است";
  }
}

const fetchUser = inject("fetchUser")
</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="./../assets/Animation.gif">
  <div v-else class="main">
    <h1>ورود</h1>
    <ul>
      <li>
        <input
          v-model="formData.username"
          type="text"
          placeholder="شناسه ملی شرکت / کد ملی مشاور"
        />
      </li>
      <li>
        <input
          v-model="formData.password"
          type="password"
          placeholder="رمز عبور"
        />
      </li>
    </ul>

    <div class="error" v-if="errMessage">
      <h3>{{ errMessage }}</h3>
    </div>

    <router-link to="/SignUp" class="links"
    >هنوز ثبت نام نکرده اید ؟
    </router-link>

    <router-link to="" class="saveAndNext" @click="subform">
      ورود
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 50%;
  min-width: 300px;
}

.main ul {
  width: 100%;
  list-style: none;
  margin: 6vh auto 5vh auto;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main ul li {
  width: 50%;
  height: 5vh;
  margin: 1vh 0;
  background-color: #f4f5f7;
  padding: 0;
}

</style>
