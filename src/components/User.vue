<script setup>
import {computed} from "vue";

let fullName = sessionStorage.getItem('fullName');
const name = computed(()=> fullName);
</script>

<template>
<div>
  <img src="./../assets/user.png" alt="">
  <h3>{{name || "نام و نام خانوادگی"}}</h3>
</div>
</template>

<style scoped>
div {
  width: 80%;
  display: flex;
  align-items: center;
}
div img {
  border-radius: 50%;
  width: 4vw;
  aspect-ratio: 1/1;
  margin: 0 1vw;
}
</style>
