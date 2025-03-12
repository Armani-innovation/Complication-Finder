<script setup>
import {onMounted, reactive, ref, computed} from "vue";
import axios from "@/axios/axios.js";

let domains = reactive({});
let picked = ref(null);
const selectedDomain = computed(() => picked.value);

const data = {
  id : sessionStorage.getItem("id"),
  nationalID: sessionStorage.getItem("nationalID"),
}

function loadDomains() {
  fetch("/domains.json").then((res) => res.json()).then((resData) => {
    Object.assign(domains, resData);
  })
}

function selectDomain(domain) {
  switch (domain) {
    case "1" :
      axios.put("human_resources/" , data) ;
      break;
    case "2" :
      axios.put("financial_resources/" , data) ;
      break;
    case "3" :
      axios.put("sales_and_marketing/" , data) ;
      break;
    case "4" :
      axios.put("capital_structure/" , data) ;
      break;
    case "5" :
      axios.put("management_organizational_structure/" , data) ;
      break;
    case "6" :
      axios.put("customer_relationship_management/" , data) ;
      break;
    case "7" :
      axios.put("manufacturing_and_production/" , data) ;
      break;
    case "8" :
      axios.put("research_and_development/" , data) ;
      break;
    case "9" :
      axios.put("product_competitiveness/" , data) ;
      break;
  }
}

onMounted(loadDomains)
</script>

<template>
  <div class="main">
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

    <router-link class="saveAndNext" @click="selectDomain(selectedDomain)"
                 :to="picked ? { name: 'Questions', params: { domain: selectedDomain } } : ''">
      ذخیره و بعدی
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
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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

</style>
