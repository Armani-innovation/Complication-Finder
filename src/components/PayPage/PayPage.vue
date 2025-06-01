<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from "@/axios/axios.js";

const router = useRouter();
const route = useRoute();

async function routePayPage() {
  const res = await axios.post("request/") ;
  console.log(res);
  window.open(res.data.url);
}

async function checkPayment() {
  const status = route.query.status
  const authority = route.query.authority

  if (status && authority) {
    try {
      const verify = await axios.get(`/api/verify-payment?authority=${authority}`)
      if (verify.data.code === 100) {
        alert("✅ پرداخت موفق بود")
      } else {
        alert("❌ پرداخت تایید نشد")
      }
    } catch {
      alert("⚠️ خطا در بررسی پرداخت")
    }

    // پاک کردن query string برای رفرش‌های بعدی
    await router.replace({ query: {} })
  }
}

function handlePopState() {
  if (route.path === '/PayPage') {
    router.push('/Profile');
  }
};

function getResults() {
  router.push({name: 'Result' , params: { result : JSON.stringify(null)} });
}

onMounted(() => {
  history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', handlePopState);
  checkPayment();
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <div class="main">
    <pre>
      عارضه یابی شما با موفقیت انجام شد
      لطفا برای مشاهده گزارش مبلغ 5,000,000 تومان را پرداخت کنید
    </pre>
    <router-link to="" class="saveAndNext" @click="routePayPage">
        پرداخت و مشاهده نتیجه
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

.main ul {
  width: 80%;
  max-width: 500px;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  justify-content: center;
  grid-gap: 2vh 5vw;
  margin: 0 auto;
  padding: 0;
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
</style>
