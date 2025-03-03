<script setup>
import Status from "@/components/Status.vue";
</script>

<template>
  <div class="container">
    <h1 class="title">پلتفرم عارضه یابی شرکت شبکه نوآوری آرمانی</h1>
    <Status class="status"/>
    <RouterView/>
  </div>
</template>

<style scoped>
  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .container h1 {
    margin: 5vh 0;
  }
  .container .title {
    text-align: center;
  }

  @media screen and (max-width: 480px) {
    .status {
      display: none;
    }
  }
</style>
