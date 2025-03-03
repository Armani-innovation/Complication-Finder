<script setup>
import {onMounted, reactive, ref, computed} from "vue";

let picked = ref(null);
let domains = reactive({});
const selectedDomain = computed(() => picked.value || 1);

function loadDomains() {
  fetch("/domains.json").then((res) => res.json()).then((resData) => {
    Object.assign(domains, resData);
  })
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

    <router-link :to="{ name: 'Questions', params: { domain: selectedDomain }}">
      <button class="saveAndNext" :disabled="!picked">
        ذخیره و بعدی
      </button>
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 50%;
  min-width: 300px;
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vw;
  text-align: center;
  margin: 5vh auto;
}

.main ul {
  width: 100%;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
  grid-gap: 2vh 1vw;
  margin: 0 auto;
  padding: 0;
}

.main ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #f4f5f7;
  cursor: pointer;
  padding: 1vh;
  transition: all 0.3s ease;
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

.main .saveAndNext {
  width: 100%;
  max-width: 200px;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 5vh auto;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
  transition: all 0.3s ease;
}

.main .saveAndNext:hover {
  background-color: #0056b3;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}

</style>
