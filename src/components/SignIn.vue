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
    const isCompany = await fetchUser()
    isLoading.value = false;
    if (isCompany) {
      const id = sessionStorage.getItem("id");
      await axios.get("register/", { params: { id } }).then((res) => {
        sessionStorage.setItem("nationalID", res.data.nationalID);
        sessionStorage.setItem("is_company" , res.data.is_company);
        sessionStorage.setItem("size" , res.data.size);
      })
      await router.push("/domains");
    } else {
      const id = sessionStorage.getItem("id");
      await axios.get("register/", { params: { id } }).then((res) => {
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("is_company" , res.data.is_company)
      })
      await router.push("/CompanyInfo");
    }
  } catch(err) {
    console.log(err)
    isLoading.value = false;
    errMessage.value = err.response.data.detail || "نام کاربری یا رمز عبور اشتباه است";
  }
}

function loginWithEnter(event) {
  if (event.key === "Enter") subform();
}

const fetchUser = inject("fetchUser")
</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="../assets/images/Animation.gif">
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
          @keyup="loginWithEnter"
        />
      </li>
    </ul>

    <div class="error" v-if="errMessage">
      <h3>{{ errMessage }}</h3>
    </div>

    <router-link to="" class="saveAndNext" @click="subform">
      ورود
    </router-link>

    <router-link to="/SignUp" class="links"
    >هنوز ثبت نام نکرده اید ؟
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 30%;
  min-width: 300px;
  text-align: center;
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
  width: 90%;
  height: 5vh;
  margin: 1vh 0;
  background-color: #f4f5f7;
  padding: 0;
}

.main .error {
  margin: 0 auto;
}
</style>
