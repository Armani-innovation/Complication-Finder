<script setup>
import router from "@/router/index.js";
import {onMounted, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

let name = ref("");
let username = ref("");
let nationalID = ref("");
let is_company = ref(null);


async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  name.value = infos.name;
  username.value = infos.username || null;
  nationalID.value = infos.nationalID || null;
  is_company.value = infos.is_company;
}

function handleSignOut() {
  sessionStorage.clear();
  router.push("/signin");
  window.location.replace('/signin');
}

onMounted(() => {
  fetchInfos();
})

</script>

<template>
  <div class="main">
    <div class="header">
      <div class="profile">
        <img src="../../assets/images/user.png" alt="">
        <div class="name">
          <h3 class="name">{{
              name || "در حال بارگذاری..."
            }}</h3>
          <h4 class="nationalId"> {{ is_company ? "شناسه ملی شرکت" : "کد ملی مشاور" }} :
            {{
              username || nationalID || "در حال بارگذاری..."
            }} </h4>
        </div>
      </div>
      <div class="setting">
        <span @click="handleSignOut">خروج از حساب</span>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
.main {
  width: 75%;
  max-height: 70vh;
  background-color: white;
}

.main .header {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main .header .profile {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.main .header .profile img {
  height: 65%;
}

.main .header .setting {
  display: flex;
  gap: 10px;
}

.main .header .setting span {
  color: red;
  cursor: pointer;
}

.main .header .setting a::before {
  color: red;
}

.main .profile .name {
  display: flex;
  flex-direction: column;
}
</style>
