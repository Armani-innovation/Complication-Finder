<script setup>
import {reactive, ref} from "vue";
import router from "@/router/index.js";
import axios from "./../axios/axios.js"

const data = reactive({
  company: {},
  userid: sessionStorage.getItem("id"),
})

let companyName = ref("");
let companyTrademark = ref("");
let companyNationalID = ref("");

let errorMessage = ref(null);

function savaAndNext() {
  if (!(companyName.value && companyNationalID.value && companyTrademark.value)) {
    errorMessage.value = "لطفا تمام فیلد ها را پر کنید"
  } else {
    data.company['name'] = companyName.value;
    data.company['registrationNumber'] = companyTrademark.value;
    data.company['nationalID'] = companyNationalID.value;
    axios.post("company/", data).then((res) => {
      sessionStorage.setItem("nationalID", res.data.nationalID);
      router.push("/domains");
    })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<template>
  <div class="main">
    <h4>برای شروع عارضه یابی لطفا اطلاعات شرکتتون رو وارد کنین</h4>

    <ul>
      <li><input type="text" placeholder="نام شرکت" v-model="companyName"/></li>
      <li><input type="text" placeholder="شناسه ملی شرکت" v-model="companyNationalID"/></li>
      <li><input type="text" placeholder="شماره ثبت علامت تجاری" v-model="companyTrademark"/></li>
      <li><input type="text" placeholder="حوزه کاری شرکت"/></li>
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
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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
