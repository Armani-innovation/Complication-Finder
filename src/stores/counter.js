import {defineStore} from "pinia";
import {reactive , ref} from "vue";
//
// export const useCompanyStore = defineStore("companyStore", () => {
//   const company = reactive({});
//
//   const setCompany = (newData) => {
//     Object.assign(company, newData);
//   };
//
//   return { company, setCompany };
// });
//
// export const useResultStore = defineStore("resultStore", () => {
//   const result = reactive({});
//
//   const setResult = (newData) => {
//     Object.assign(result, newData);
//   }
//
//   return { result, setResult };
// })
// export const useheight = defineStore("height", () => {
//
//   const numOfHeight = ref(0);
//
//   const setHeight = (newHeight) => {
//     numOfHeight.value += newHeight;
//     console.log(numOfHeight.value)
//   }
//
//   const getHeight = () => {
//     return numOfHeight.value ;
//   }
//
//   return {numOfHeight, setHeight};
// })
//
// export const useNumOfPersons = defineStore("numOfPersons", () => {
//   const numOfPersons = ref(0);
//
//   const setNumOfPersons = (newNumOfPersons) => {
//     numOfPersons.value = newNumOfPersons;
//   }
//
//   return {numOfPersons, setNumOfPersons};
// })

export const storeHistory = defineStore("history-store", ()=>{
  const historyArr = reactive([]);
  const historyDomain = ref(0) ;

  const setHistory = (history , domain) => {
    Object.assign(historyArr, history);
    historyDomain.value = domain;
  }

  return {setHistory , historyArr , historyDomain}
})

