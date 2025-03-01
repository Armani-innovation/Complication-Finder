<script setup>
import {reactive, ref} from "vue";
import {useCompanyStore} from "./../stores/counter.js";
import router from "@/router/index.js";

const companyStore = useCompanyStore();


const data = reactive({
  company: {
    name: "",
    registrationNumber: "",
    nationalID: ""
  }
})

let companyName = ref("");
let companyNationalID = ref("");
let companyTrademark = ref("");

let isFilled = ref(false);

function savaAndNext() {
  if (!(companyName.value && companyNationalID.value && companyTrademark.value)) {
    isFilled.value = true;
  } else {
    isFilled.value = false;
    data.company.name = companyName.value;
    data.company.registrationNumber = companyNationalID.value;
    data.company.nationalID = companyTrademark.value;
    router.push("/domains");
    companyStore.setCompany(data);
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
    <p class="error" v-if="isFilled">لطفا تمام فیلد ها رو پر کنین</p>
    <RouterLink @click="savaAndNext" to="">
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
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vw;
  margin: 5vh auto;
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
}

.main ul li input {
  font-family: "B Yekan", cursive;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  padding: 0 5%;
  background-color: #f4f5f7;
  font-size: 13px;
}

.main .error {
  color: red;
  margin-right: 3vw;
}

.main .saveAndNext {
  width: 100%;
  max-width: 200px;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 2vh auto;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}

@media screen and (max-width: 768px) {
  .main {
    width: 90%;
    padding: 4vh 4vw;
  }

  .main ul {
    grid-template-columns: 1fr;
    padding-bottom: 5vh;
  }

  .main .saveAndNext {
    width: 80%;
    max-width: 180px;
  }
}

@media screen and (max-width: 1024px) {
  .main {
    width: 70%;
  }

  .main ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>
