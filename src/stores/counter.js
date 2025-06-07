import {defineStore} from 'pinia';
import {reactive, ref} from "vue";

export const useResultStore = defineStore('result', ()=>{
  const result = reactive({}) ;
  const financialResult = ref("") ;

  function updateResult(newResult) {
    Object.assign(result, newResult);
  }

  function updateFinancialResult(newFinancialResult) {
    financialResult.value = newFinancialResult;
  }
  return {result, financialResult, updateResult, updateFinancialResult};
})

export const useQuestionStore = defineStore('question', ()=>{
  const question = reactive({}) ;

  function setQuestion(newQuestion) {
    Object.assign(question, newQuestion);
  }
  return {question, setQuestion};
})

export let isFinancial = ref(false);
