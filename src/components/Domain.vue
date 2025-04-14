<script setup>
import {onMounted, reactive, ref, computed, provide} from "vue";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";

let errMessage = ref("");
let isLoading = ref(false);
let domains = reactive({});
let picked = ref(null);
const selectedDomain = computed(() => picked.value);

const data = {
  userid: sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID"),
}

function loadDomains() {
  fetch("/domains.json").then((res) => res.json()).then((resData) => {
    Object.assign(domains, resData);
  })
}

function selectDomain(domain) {
  switch (domain) {
    case 1 :
      sendRequest("human_resources");
      break;
    case 2 :
      sendRequest("sales_and_marketing");
      break;
    case 3 :
      sendRequest("sales_and_marketing")
      break;
    case 4 :
      sendRequest("research_and_development");
      break;
    case 5 :

      break;
  }
}

async function sendRequest(domain) {
  const retries = 3 ;
  const delay = 2000 ;
  isLoading.value = true;

  sessionStorage.setItem("domain", JSON.stringify([`${domain}`, selectedDomain.value]));

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await axios.put(`${domain}/`, data);
      isLoading.value = false;
      provide("questionCount" , 1)
      return router.push("/questions");
    } catch {

      if (attempt === retries) {
        isLoading.value = false;
        errMessage.value = "خطایی رخ داده است. لطفا دوباره تلاش کنید.";
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

}

onMounted(loadDomains)
</script>

<template>
  <img v-if="isLoading" src="../assets/images/Animation.gif" alt=""/>
  <div class="main" v-else>
    <p>{{ domains.question }}</p>
    <ul>
      <li v-for="(domain , index) in domains.options" :key="domain" :for="index">
        <input name="domain" type="radio" :id="index" :value="Number(index)+1" v-model="picked"/>
        <label :for="index">
          <font-awesome-icon class="icon" :icon="domains.icons[index]"/>
          {{ domain }}
        </label>
      </li>
    </ul>
    <p class="error" v-if="errMessage">{{ errMessage }}</p>
    <router-link to="" class="saveAndNext" @click="selectDomain(selectedDomain)">
      شروع عارضه یابی
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 50%;
  min-width: 300px;
  margin-top: 75px;
}

.main ul {
  width: 100%;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

@media screen and (max-width: 480px) {
  .main {
    width: 100%;
    margin-top: 0;
  }
}

@media screen and (max-width: 768px) {
  .main {
    width: 100%;
    margin-top: 0;
  }
}

@media screen and (max-width: 1024px) {
  .main {
    width: 50%;
  }
}

</style>
