<script setup>
import {onMounted, onUnmounted} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

function handlePopState() {
  if (route.path === '/PayPage') {
    router.push('/Profile');
  }
}

onMounted(() => {
  history.pushState(null, '', window.location.href);
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
  <div class="main">
    <pre>
      پرداخت شما با خطا مواجه شد 🔴
      لطفا از صفحه پروفایل خود ، مجددا اقدام به پرداخت کنید
    </pre>
    <router-link to="/Profile" class="saveAndNext">
      رفتن به صفحه پروفایل
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
