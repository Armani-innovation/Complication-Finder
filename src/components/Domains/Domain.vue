<script setup>
import {onMounted, reactive, ref, computed} from "vue";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";
import {getTokenInfo} from "@/composables/composable.js";
import {useQuestionStore} from "@/stores/counter.js";

const nationalId = sessionStorage.getItem("nationalID") || null;
const questionStore = useQuestionStore();

let name = ref("")
let errMessage = ref("");
let isLoading = ref(false);
let domains = reactive([]);

let picked = ref(null);
const selectedDomain = computed(() => picked.value);
const nationalID = ref("")

async function loadDomains() {
  const res = await axios.get("/domain")
  Object.assign(domains, res.data)
  const token = sessionStorage.getItem("token");
  const data = await getTokenInfo(token);
  nationalID.value = data.nationalID || data.username;
  if (nationalId) {
    nationalID.value = nationalId;
    const res = await axios.get("company/", {params: {nationalID: nationalID.value}});
    name.value = res.data.name;
  } else {
    name.value = data.name;
  }
  isLoading.value = false;
}

async function fetchDomain(domain) {
  const retries = 3;
  isLoading.value = true;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.post("start-questionnaire/", {
        domain,
        nationalID: nationalID.value
      });
      questionStore.setQuestion(res.data);
      isLoading.value = false;
      if (domain === "تحلیل صورت های مالی" || domain === "بررسی اعتبار مالی شرکت") {
        await router.push("/FinancialQuestions");
      } else {
        await router.push("/Questions");
      }
      break;
    } catch {

      if (attempt === retries) {
        isLoading.value = false;
        errMessage.value = "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      }
    }
  }
}

onMounted(() => {
  isLoading.value = true;
  sessionStorage.removeItem("report_id")
  loadDomains();
})
</script>

<template>
  <img v-if="isLoading" class="loader" src="../../assets/images/Animation.gif" alt=""/>
  <div class="main" v-else>
    <p>در چه حوزه ای میخواهید عارضه یابی را انجام دهید ؟</p>
    <ul>
      <li v-for="(domain , index) in domains" :key="domain" :for="index">
        <input name="domain" type="radio" :id="index" :value="Number(index)" v-model="picked"/>
        <label :for="index">
          <font-awesome-icon class="icon" :icon="domain.icon"/>
          {{ domain.name }}
        </label>
      </li>
    </ul>
    <div class="complicationFor">
      <p style="color: #0056b3">شما در حال انجام عارضه یابی برای شر کت {{ name }} هستید. </p>
      <router-link to="/CompanyInfo" class="links"> تغییر شرکت</router-link>
    </div>
    <p class="error" v-if="errMessage">{{ errMessage }}</p>
    <router-link to="" v-if="picked !== null" class="saveAndNext"
                 @click="fetchDomain(domains[selectedDomain].name)">
      شروع عارضه یابی
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 60%;
  min-height: 30vh;
  min-width: 300px;
}

.main .complicationFor {
  display: flex;
  align-items: center;
  margin-top: 2vh;
}

.main .complicationFor a {
  margin-right: 1vw;
}

.main ul {
  width: 100%;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  grid-gap: 2vh 1vw;
  margin: 0 auto;
  padding: 0;
}

.main ul li {
  background-color: #f4f5f7;
}

.main ul li:hover {
  background-color: #e0e0e0;
}

.main ul li label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 1vh;
}

.main ul li input {
  cursor: pointer;
  display: none;
}

.main ul li input:checked + label {
  color: green;
  font-weight: bold;
  transition: ease 100ms;
}

.main ul li label .icon {
  margin: 0 0.5vw;
}

@media screen and (max-width: 1279px) {
  .main {
    width: 75%;
  }
}

@media screen and (max-width: 768px) {
  .main {
    width: 75%;
  }

  .main ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .main {
    max-height: max-content;
  }

  .main ul {
    grid-template-columns: repeat(1, 1fr);
  }
}

</style>
