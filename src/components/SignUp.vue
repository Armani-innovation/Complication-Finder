<script setup>
import {reactive, ref, inject} from "vue"
import router from "@/router/index.js";
import axios from "@/axios/axios.js";
import {useNumOfPersons} from "@/stores/counter.js";

const store = useNumOfPersons()

const is_company = ref(false);
let companyMembers = ref(null);
let errorMessage = ref(null);
let formData = reactive({});

function handleEvent() {

  if ((formData.name && formData.registrationNumber && formData.username && formData.password && formData.repeatPassword) || (formData.name && formData.username && formData.password && formData.repeatPassword)) {
    is_company.value ?
      handleCompany()
      :
      handleMentor()
  } else {
    errorMessage.value = "لطفا تمام فیلد ها را پر کنید.";
  }

}

async function handleCompany() {

  const retries = 3;
  const delay = 2000;
  try {
    formData["is_company"] = is_company.value;
    let res;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        res = await axios.post("register/", formData);
        break;

      } catch {

        if (attempt === retries)
          errorMessage.value = "خطایی رخ داد لطفا دوباره تلاش کنید.";

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    sessionStorage.setItem("id", res.data.id);
    sessionStorage.setItem("nationalID", res.data.username);
    store.setNumOfPersons(companyMembers.value);

    await fetchUser();

    await router.push("/domains");
  } catch (err) {
    errorMessage.value = err.response.data.username[0];
  }
}

async function handleMentor() {

  const retries = 3;
  formData["is_company"] = is_company.value;

  let res;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      res = await axios.post("register/", formData);
      sessionStorage.setItem("id", res.data.id);
      await fetchUser();
      await router.push("/CompanyInfo");
      break;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        if (attempt === retries) errorMessage.value = "درخواست با خطا مواجه شد لطفا دوباره تلاش کنید";
      } else {
        errorMessage.value = err.response.data.username[0] || err.response.data.error;
        break;
      }
    }
  }

}

const fetchUser = inject("fetchUser");

</script>

<template>
  <div class="main">

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

    <ul v-if="is_company" :class="{companyUl : is_company}">
      <li>
        <input
          v-model="formData['name']"
          type="text"
          placeholder="نام شرکت"
        />
      </li>

      <li>
        <input
          v-model="formData['registrationNumber']"
          type="text"
          placeholder="شماره ثبت شرکت"
          maxlength="4"
        />
      </li>

      <li>
        <input
          v-model="formData['username']"
          type="text"
          placeholder="شناسه ملی شرکت"
          maxlength="11"
        />
      </li>

      <li>
        <input
          v-model="companyMembers"
          type="text"
          placeholder="تعداد کارمندان شرکت"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="رمز عبور"
          v-model="formData['password']"
          minlength="8"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="تکرار رمز عبور"
          v-model="formData['repeatPassword']"
          minlength="8"
        />
      </li>
    </ul>

    <ul v-else>
      <li>
        <input
          v-model="formData['name']"
          type="text"
          placeholder="نام و نام خانوادگی"
        />
      </li>

      <li>
        <input
          v-model="formData['username']"
          type="text"
          placeholder="کد ملی"
          maxlength="10"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="رمز عبور"
          v-model="formData['password']"
          minlength="8"
        />
      </li>

      <li>
        <input
          type="password"
          placeholder="تکرار رمز عبور"
          v-model="formData['repeatPassword']"
          minlength="8"
        />
      </li>
    </ul>

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <router-link to="/SignIn" class="links">ثبت نام کرده اید ؟</router-link>

    <router-link to="" class="saveAndNext" @click="handleEvent">
      ثبت نام
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 40%;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 30vh;
  z-index: 0;
}

.main h4 {
  margin: 5vh 0 1vh 0;
}

.main ul {
  width: 70%;
  height: 50vh;
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
}

.main ul li {
  height: 6vh;
  width: 80%;
  margin: 1vh 0;
  background-color: #f4f5f7;
  padding: 0;
  transition: all ease 300ms;
}

.main .options {
  position: relative;
  width: 70%;
  height: 10vh;
  display: flex;
  justify-content: center;
  background-color: white;
  margin: 0 auto;
  z-index: 3;
  background-color: rgba(0, 0, 0 ,0);
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
  font-size: 1vw;
}

.main .options div input:checked + label {
  color: #0056b3;
}

</style>
