<script setup>

// import {reactive} from "vue";
//
// let questions = reactive([]);
// let questionsKey = reactive([]);
// let options = reactive([]);
//
// function fetchQuestions() {
//   fetch("/smCompanyQuestions.json").then((res) => res.json()).then((resData) => {
//     for (const dataKey in resData[].questions) {
//       questions.push(resData[].questions[dataKey])
//       questionsKey.push(dataKey);
//     }
//     for (const dataKey in resData[].options) {
//       options.push(resData[].options[dataKey])
//     }
//   })
// }
// fetchQuestions();

</script>

<template>
  <div class="main">
    <p>{{ questions[questionCounter] }}</p>
    <ul>
      <li v-for="(option , index) in options[questionCount]" :key="option" :for="index">
        <input type="radio" name="option" :id="index" :value="Number(index)+1" v-model="picked"/>
        <label :for="index">{{ option }}</label>
      </li>
    </ul>
    <button class="saveAndNext" @click="updateQuestion" :disabled="!picked">
      ذخیره و بعدی
    </button>
  </div>
</template>

<style scoped>

</style>
