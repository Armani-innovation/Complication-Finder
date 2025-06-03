<script setup>
import router from "@/router/index.js";
import {getTokenInfo} from "@/composables/composable.js";
import {onMounted, ref} from "vue";

let is_company = ref(null);

async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  is_company.value = infos.is_company;
}

function startComplication() {
  if (is_company.value) router.push("/domains")
  else router.push("/CompanyInfo")
}

onMounted(() => {
  sessionStorage.setItem("requested" , false) ;
  fetchInfos();
})
</script>

<template>
  <div class="main">
    <div class="optionsContainer">
      <div class="options">
        <router-link class="link" to="/ComplicationHistory">سوابق عارضه یابی</router-link>
        <router-link class="link" to="">سوابق مالی</router-link>
        <router-link class="link" to="/EditProfile">ویراش پروفایل</router-link>
        <router-link class="link" to="/signin">بازگشت</router-link>
      </div>
      <div class="startComplication">
        <!-- <img src="@/assets/images/Artboard%201.png" alt=""> -->
        <button class="saveAndNext" @click="startComplication">
          {{ is_company ? "عارضه یابی شرکت خودم" : "شروع عارضه یابی" }}
        </button>
        <router-link to="/CompanyInfo" v-if="is_company" class="saveAndNext">
          عارضه یابی دیگر شرکت ها
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 75%;
  max-height: 70vh;
  background-color: white;
  padding: 0;
}
.main .optionsContainer {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.main .optionsContainer .options {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.main .optionsContainer .options .saveAndNext {
  background: none;
  color: #0056b3;
  margin: 2vh auto;
}

.main .optionsContainer .options .link {
  margin: 2vh auto;
}

.main .optionsContainer .startComplication {
  background-image: url("@/assets/images/Capture.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 70%;
  height: 50vh;
  display: flex;
  align-items: end;
  justify-content: center;
}

.main .optionsContainer .startComplication .saveAndNext {
  background: none;
  width: max-content;
  margin: 5vh 2vw;
  font-size: 13px;
  border: 2px solid #ffffff;
}

.main .optionsContainer .startComplication a {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.5vw;
}

.main .optionsContainer .startComplication a:hover::before {
  width: 0;
}

.main .optionsContainer .startComplication img {
  width: 100%;
  height: 100%;
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
