<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {isFinancial} from "@/stores/counter.js";

const router = useRouter();
const route = useRoute();

let previousRoute = ref("");

function handlePopState() {
  if (route.path === '/PayPage') {
    router.push('/Profile');
  }
}

function getResults() {
  if (isFinancial.value){
    router.push("/FinancialResult");
  }else {
    router.push("/Result");
  }
}

onMounted(() => {
  history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', handlePopState);
  previousRoute.value = sessionStorage.getItem("lastRouteBeforePayment");
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <div class="main">
    <pre>
      پرداخت شما با موفقیت انجام شد☑️
    </pre>
    <router-link to="" class="saveAndNext" @click="getResults">
      مشاهده گزارش
    </router-link>
  </div>
</template>

<style scoped>
.main {
  width: 50%;
  min-width: 300px;
}

.main pre {
  font-family: "B Yekan", cursive;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
