<script setup>
import {onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";

const isLoading = ref(true);

const userInfo = reactive({
  company_domain: null,
  id: null,
  is_company: null,
  name: null,
  username: null,
  size: null,
})

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  const allowedKeys = Object.keys(userInfo);
  for (const key of allowedKeys) {
    if (key === 'username') {
      userInfo.username = infos.username ?? infos.nationalID ?? null;
    } else if (key in infos) {
      userInfo[key] = infos[key];
    }
  }
  userInfo.id = infos.user_id ;
  isLoading.value = false;
}

async function editInfo() {
  await axios.put("register/", userInfo);
  await router.push("/Profile");
}

onMounted(() => {
  fetchInfos();
})
</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="../../assets/images/Animation.gif">
  <div class="main" v-else>
    <p>لطفا هر کدام از مواردی را که میخواهید تغییر دهید ، مقدار قبلی را پاک کرده و مقدار جدید را جایگزین کنید</p>
    <div class="inputs" :class="{mentor : !userInfo.is_company}">
      <div>
        <label for="name">{{userInfo.is_company ? "نام شرکت" : "نام و نام خانوادگی" }}</label>
        <input
          id="name"
          v-model="userInfo.name"
          type="text"
        />
      </div>
      <div>
        <label for="username">{{userInfo.is_company ? " شناسه ملی شرکت" : "کد ملی" }}</label>
        <input
          id="username"
          v-model="userInfo.username"
          type="text"
          maxlength="11"
        />
      </div>
      <div v-if="userInfo.is_company">
        <label for="domain">حوزه کاری شرکت</label>
        <input id="domain" v-model="userInfo.company_domain" type="text">
      </div>
      <div v-if="userInfo.is_company">
        <label for="size">تعداد نفرات شرکت</label>
        <select id="size" v-model="userInfo.size" required>
          <option value="" class="null" disabled selected>تعداد اعضای شرکت</option>
          <option value="SMALL">زیر 15 نفر</option>
          <option value="MEDIUM">15 تا 50 نفر</option>
          <option value="LARGE">بیش از 50 نفر</option>
        </select>
      </div>
    </div>
    <button class="saveAndNext" @click="editInfo">ویرایش اطلاعات</button>
    <router-link to="/Profile">بازگشت</router-link>
  </div>
</template>

<style scoped>
.main {
  width: 75%;
  max-height: 70vh;
  background-color: white;
}

.main .inputs {
  margin-top: 5vh;
  width: 90%;
  height: 30vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 10px;
}

.main .mentor {
  height: 10vh;
}

.main .inputs input {
  height: 40%;
  background-color: #f4f5f7;
  font-size: 15px;
}

.main .inputs input:hover {
  background-color: #e1e1e6;
}

.main .inputs select {
  background-color: #f4f5f7;
  height: 40%;
}

.main .inputs select:hover {
  background-color: #e1e1e6;
}

a {
  display: inline;
  text-decoration: none;
  color: #0056b3;
  position: relative;
  z-index: 0;
  cursor: pointer;
}

a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: -5px;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}
</style>
