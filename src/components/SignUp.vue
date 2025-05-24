<script setup>
import {reactive, ref} from "vue"
import router from "@/router/index.js";
import axios from "@/axios/axios.js";
import {getInfo} from "@/composables/composable.js";

const isLoading = ref(false);
let is_company = ref(false);
let errorMessage = ref(null);

let formData = reactive({
  is_company: "",
  name: "",
  username: "",
  password: "",
  repeatPassword: "",
  registrationNumber: "",
  size: "",
  company_domain: "",
});

function handleEvent() {

  if ((formData.name && formData.registrationNumber && formData.username && formData.password && formData.repeatPassword) || (formData.name && formData.username && formData.password && formData.repeatPassword)) {
    is_company.value ?
      handleCompany()
      :
      handleMentor()
  } else {
    isLoading.value = false;
    errorMessage.value = "لطفا تمام فیلد ها را پر کنید.";
  }

}

async function handleCompany() {
  formData.is_company = "True";
  isLoading.value = true;
  const retries = 3;
  try {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await axios.post("register/", formData);
        break;
      } catch (error) {
        if (attempt === retries)
          errorMessage.value = error.response.data || "خطایی رخ داد لطفا دوباره امتحان کنید";
      }
    }

    await getInfo(formData.username, formData.password);

    // sessionStorage.setItem("size", res.data.size);
    // sessionStorage.setItem("is_company", true)
    // sessionStorage.setItem("id", res.data.id);
    // sessionStorage.setItem("nationalID", res.data.nationalID);
    // sessionStorage.setItem("name", res.data.name);

    await router.push("/profile");
  } catch (err) {
    isLoading.value = false;
    errorMessage.value = err.response.data;
  }
  isLoading.value = false;
}

async function handleMentor() {

  isLoading.value = true;
  const retries = 3;
  formData.is_company = "False";
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {

      const res = await axios.post("register/", formData);

      // sessionStorage.setItem("is_company", false);
      // sessionStorage.setItem("id", res.data.id);
      // sessionStorage.setItem("username", res.data.username);

      await getInfo(formData.username, formData.password);

      await router.push("/profile");
      break;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        if (attempt === retries) errorMessage.value = "درخواست با خطا مواجه شد لطفا دوباره تلاش کنید";
      } else {
        errorMessage.value = err.response.data || err.response.data || "درخواست با خطا مواجه شد لطفا دوباره تلاش کنید";
        break;
      }
    }
  }
  isLoading.value = false;
}

// function enterHandleCompany(event) {
//   if (event.key === "Enter") handleCompany();
// }
//
// function enterHandleMentor(event) {
//   if (event.key === "Enter") handleMentor();
// }

</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="../assets/images/Animation.gif">
  <div v-else class="main">

    <h1>ثبت نام</h1>

    <h4>نقش شما</h4>

    <div class="options">
      <div :class="{mentor : !is_company}">
        <input type="radio" name="personType" id="mentor" :value="false" v-model="is_company">
        <label for="mentor">حقیقی</label>
      </div>
      <div :class="{company : is_company}">
        <input type="radio" name="personType" id="company" :value="true" v-model="is_company">
        <label for="company">حقوقی</label>
      </div>
    </div>

<!--    <ul v-if="is_company" :class="{companyUl : is_company}" @keyup="enterHandleCompany">-->
    <ul v-if="is_company" :class="{companyUl : is_company}">
      <li>
        <input
          v-model="formData.name"
          type="text"
          placeholder="نام شرکت"
        />
      </li>

      <li>
        <input
          v-model="formData.registrationNumber"
          type="text"
          placeholder="شماره ثبت شرکت"
          maxlength="4"
        />
      </li>

      <li>
        <input
          v-model="formData.username"
          type="text"
          placeholder="شناسه ملی شرکت"
          maxlength="11"
        />
      </li>

      <li>
        <input v-model="formData.company_domain" type="text" placeholder="حوزه کاری شرکت">
      </li>

      <li>
        <select v-model="formData.size" required>
          <option value="" class="null" disabled selected>تعداد اعضای شرکت</option>
          <option value="SMALL">زیر 15 نفر</option>
          <option value="MEDIUM">15 تا 50 نفر</option>
          <option value="LARGE">بیش از 50 نفر</option>
        </select>
      </li>

      <li>
        <input
          type="password"
          placeholder="رمز عبور"
          v-model="formData.password"
          minlength="8"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="تکرار رمز عبور"
          v-model="formData.repeatPassword"
          minlength="8"
        />
      </li>
    </ul>

<!--    <ul v-else @keyup="enterHandleMentor">-->
    <ul v-else>
      <li>
        <input
          v-model="formData.name"
          type="text"
          placeholder="نام و نام خانوادگی"
        />
      </li>

      <li>
        <input
          v-model="formData.username"
          type="text"
          placeholder="کد ملی"
          maxlength="10"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="رمز عبور"
          v-model="formData.password"
          minlength="8"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="تکرار رمز عبور"
          v-model="formData.repeatPassword"
          minlength="8"
        />
      </li>
    </ul>

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <router-link to="/SignIn" class="links" id="isSignUp">ثبت نام کرده اید ؟</router-link>

<!--    <router-link to="" class="saveAndNext" @click="handleEvent">-->
<!--      ثبت نام-->
<!--    </router-link>-->
  </div>
</template>

<style scoped>
.main {
  width: 40%;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  z-index: 0;
  background-color: white;
}

.main h4 {
  margin: 5vh 0 1vh 0;
}

.main ul {
  width: 90%;
  min-height: 45vh;
  list-style: none;
  margin: 0 auto 5vh auto;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #DAD9D9;
  border-radius: 30px 0 30px 30px;
  transition: all ease 300ms;
  z-index: 3;
}

.main .companyUl {
  border-radius: 0 30px 30px 30px;
  min-height: 60vh;
}

.main .companyUl li {
  margin: 1.5vh 0;
}

.main ul li {
  height: 6vh;
  width: 80%;
  margin: 1.5vh 0;
  background-color: #f4f5f7;
  padding: 0;
  transition: all ease 300ms;
}

.main ul li input {
  background-color: white;
}

.main ul li input:hover {
  background-color: #b9b9b9;
}

.main .options {
  position: relative;
  width: 90%;
  min-height: 10vh;
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 0 auto;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0);
}

.main .options::before {
  position: absolute;
  content: "";
  bottom: -30px;
  width: 100%;
  height: 30px;
  background-color: #f4f5f7;
}

.main .options div {
  width: 50%;
  border-radius: 30px 30px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 300ms;
  background-color: #f4f5f7;
}

.main .options .company {
  background-color: #DAD9D9;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.main .options .mentor {
  background-color: #DAD9D9;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.main .options div input {
  display: none;
}

.main .options div label {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.main .options div input:checked + label {
  color: #0056b3;
}

.main .saveAndNext {
  min-height: 5vh;
}

@media screen and (max-width: 480px) {

}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 1024px) {

}
</style>
