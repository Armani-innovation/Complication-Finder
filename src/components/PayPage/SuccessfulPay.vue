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

function getResults() {
  router.push({name: 'Result' , params: { result : JSON.stringify(null)} });
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
