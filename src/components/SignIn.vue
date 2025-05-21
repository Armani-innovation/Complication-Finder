<script setup>
import {reactive, ref} from "vue"
import axios from "@/axios/axios.js";
import router from "@/router/index.js";
import {getInfo} from "@/composables/composable.js";

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
    sessionStorage.setItem("token", JSON.stringify(token));
    await getInfo(formData.username , formData.password);
    isLoading.value = false;
    await router.push("/profile")
  } catch(err) {
    console.log(err)
    isLoading.value = false;
    errMessage.value = err.response.data || "نام کاربری یا رمز عبور اشتباه است";
  }
}

function loginWithEnter(event) {
  if (event.key === "Enter") subform();
}

</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="../assets/images/Animation.gif">
  <div v-else class="main">
    <h1>ورود</h1>
    <ul @keyup="loginWithEnter">
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

    <router-link to="" class="saveAndNext" @click="subform">
      ورود
    </router-link>

<!--    <router-link to="/SignUp" class="links"-->
<!--    >هنوز ثبت نام نکرده اید ؟-->
<!--    </router-link>-->
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
