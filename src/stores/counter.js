// import {defineStore} from "pinia";
// import {reactive} from "vue";
//
// export const useQuestion = defineStore("question", {
//
//   const question = reactive({})
//
//   function setQuestion(newQuestion){
//     Object.assign(question, newQuestion);
//   }
//
//   return { question, setQuestion };
//
// })

import {defineStore} from 'pinia';

export const useQuestionStore = defineStore('question', {
  state: () => ({
    question: {}
  }),
  actions: {
    setQuestion(data) {
      this.question = data;
    }
  }
});
