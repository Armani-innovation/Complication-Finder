<script setup>
import {reactive, ref} from "vue"
import axios from "@/axios/axios.js";
import router from "@/router/index.js";
import {jwtDecode} from "jwt-decode";

let loginError = ref(null);
let formData = reactive({
  username: "",
  password: "",
})

function subform() {
  axios.post("token/" , formData).then((res)=>{
    localStorage.setItem("token", res.data.access)
    // router.push("/domains")
    decodeToken()
  })
}

function decodeToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }
}

</script>

<template>
  <div class="main">
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

    <div class="error" v-if="loginError">
      <h3>{{loginError}}</h3>
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
