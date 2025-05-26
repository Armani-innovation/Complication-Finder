<script setup>
  import {ref} from "vue";

  let minute = ref(15) ;
  let second = ref(0) ;

  function startTimer(){
    if (second.value === 0){
      second.value = 59;
      minute.value-- ;
    }
    second.value--;
    if (second.value === 0){
      second.value = 59;
      minute.value-- ;
    }
  }

  setInterval(startTimer, 1000);
</script>

<template>
<div>
  <p> <span v-if="second >= 0 && second < 10">0</span>{{second}} : <span v-if="minute >= 0 && minute < 10">0</span>{{minute}}</p>
</div>
</template>

<style scoped>
p {
  color: white;
}
</style>
