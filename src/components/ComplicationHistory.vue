<script setup>

import router from "@/router/index.js";
function backward() {
  router.back()
}

</script>

<template>
  <div class="main">

    <router-link class="link" to="" @click="backward">بازگشت</router-link>
  </div>
</template>

<style scoped>
.main {
  top: 5vh;
  width: 75%;
  max-height: 90vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: white;
}

a {
  display: inline;
  text-decoration: none;
  color: #0056b3;
  position: relative;
  z-index: 0;
}

a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: 0;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}
</style>
