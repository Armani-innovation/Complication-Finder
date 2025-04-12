import { defineStore } from "pinia";
import {reactive, ref} from "vue";

export const useCompanyStore = defineStore("companyStore", () => {
  const company = reactive({});

  const setCompany = (newData) => {
    Object.assign(company, newData);
  };

  return { company, setCompany };
});

export const useResultStore = defineStore("resultStore", () => {
  const result = reactive({});

  const setResult = (newData) => {
    Object.assign(result, newData);
  }

  return { result, setResult };
})

export const useNumOfPersons = defineStore("numOfPersons", ()=>{
  const numOfPersons = ref(0);

  const setNumOfPersons = (newNumOfPersons) => {
    numOfPersons.value = newNumOfPersons;
  }

  return { numOfPersons, setNumOfPersons };
})
