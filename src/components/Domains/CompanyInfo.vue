<script setup>
import {onMounted, reactive, ref} from "vue";
import router from "@/router/index.js";
import axios from "../../axios/axios.js";
import {getTokenInfo} from "@/composables/composable.js";

let isLoading = ref(false);

const data = reactive({
  userid: 0,
  company: {
    name: "",
    nationalID: "",
    size: "",
    company_domain: "",
  },
});

let errorMessage = ref(null);

async function fetchInfo() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  data.userid = infos.id;
}

async function savaAndNext() {
  if (!(data.company.name && data.company.nationalID && data.company.company_domain && data.company.size)) {
    errorMessage.value = "لطفا تمام فیلد ها را پر کنید"
  } else {
    isLoading.value = true;

    try {
      const res = await axios.post("company/", data);

      sessionStorage.setItem("nationalID", res.data.nationalID);

      await router.push("/domains");
    } catch (error) {
      isLoading.value = false;
      errorMessage.value = error.response.data || "خطایی رخ داد لطفا دوباره تلاش کنید"
    }
  }
}

onMounted(() => {
  fetchInfo()
})
</script>

<template>
  <img v-if="isLoading" class="loader" alt="" src="../../assets/images/Animation.gif">
  <div class="main" v-else>
    <h4>برای شروع عارضه یابی لطفا اطلاعات شرکتتون رو وارد کنین</h4>

    <ul>
      <li><input type="text" placeholder="نام شرکت" v-model="data.company.name"/></li>
      <li><input maxlength="11" type="text" placeholder="شناسه ملی شرکت"
                 v-model="data.company.nationalID"/></li>
      <li>
        <input v-model="data.company.company_domain" type="text" placeholder="حوزه کاری شرکت">
      </li>
      <li><select v-model="data.company.size" required>
        <option class="null" value="" disabled selected>تعداد اعضای شرکت</option>
        <option value="SMALL">زیر 15 نفر</option>
        <option value="MEDIUM">15 تا 50 نفر</option>
        <option value="LARGE">بیش از 50 نفر</option>
      </select></li>
    </ul>

    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

    <RouterLink class="saveAndNext" @click="savaAndNext" to="">
      <button class="saveAndNext">
        ذخیره و بعدی
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
  min-width: 300px;
}

.main h4 {
  margin: 0;
}

.main ul {
  width: 100%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  justify-content: center;
  margin: 6vh auto 2vh auto;
  padding-bottom: 10vh;
  padding-right: 0;
  grid-gap: 3vh 1vw;
}

.main ul li {
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.main ul li:hover {
  background-color: #e0e0e0;
}


</style>
