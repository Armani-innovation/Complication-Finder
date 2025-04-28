<script setup>
import router from "@/router/index.js";
//
function backward() {
  router.back()
}
//
// const props = defineProps(["index"])
// console.log(props.index)

// function returnDomain(englishDomain) {
//   switch (englishDomain) {
//     case "branding_l" :
//       return ("برندینگ (شرکت های بزرگ)");
//     case "branding_m" :
//       return ("برندینگ (شرکت های متوسط)");
//     case "branding_s" :
//       return ("برندینگ (شرکت های کوچک)");
//     case "human_resources_l" :
//       return ("منابع انسانی (شرکت های بزرگ)");
//     case "human_resources_m" :
//       return ("منابع انسانی (شرکت های متوسط)");
//     case "human_resources_s" :
//       return ("منابع انسانی (شرکت های کوچک)");
//     case "sales_and_marketing_l" :
//       return ("فروش و مارکتینگ(شرکت های بزرگ)");
//     case "sales_and_marketing_m" :
//       return ("فروش و مارکتینگ(شرکت های متوسط)");
//     case "sales_and_marketing_s" :
//       return ("فروش و مارکتینگ(شرکت های کوچک)");
//
//   }
// }
//


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
