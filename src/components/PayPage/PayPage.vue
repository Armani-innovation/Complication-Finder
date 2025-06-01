<script setup>
import axios from "@/axios/axios.js";

async function routePayPage() {
  const res = await axios.post("request/") ;
  console.log(res);
  window.open(res.data.url);
}

</script>

<template>
  <div class="main">
    <pre>
      عارضه یابی شما با موفقیت انجام شد
      لطفا برای مشاهده گزارش مبلغ 5,000,000 تومان را پرداخت کنید
    </pre>
    <router-link to="" class="saveAndNext" @click="routePayPage">
        پرداخت
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
