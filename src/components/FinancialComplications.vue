<script setup>
import axios from "@/axios/axios.js";
import {reactive} from "vue";

let data = reactive({
  net_sales: "",
  net_profit_period: "",
  total_assets_end_period: "",
  average_assets_year: "",
  equity_end_period: "",
  financial_expenses: "",
  sales_change_percentage: ""
})

function sendValues() {
  axios.put("financial/", data).then(response => {
    console.log(response)
  })
}
</script>

<template>
  <div class="main">
    <h3>عارضه یابی مالی</h3>
    <p>لطفا به سوالات زیر با توجه به صورت سود و زیان و ترازنامه سال مالی گذشته پاسخ دهید: (مقادیر را
      به عدد و به واحد ریال وارد کنید)</p>
    <div class="questions">
      <input v-model="data.net_sales" @input="formatInput('net_sales')" type="text"
             placeholder="میزان فروش خالص (درآمد کل)">
      <input v-model="data.net_profit_period" @input="formatInput('net_profit_period')" type="text"
             placeholder="سود خالص دوره (پس از کسر همه هزینه‌ها، مالیات و بهره)">
      <input v-model="data.total_assets_end_period" @input="formatInput('total_assets_end_period')"
             type="text" placeholder="مجموع دارایی‌ها در پایان دوره">
      <input v-model="data.average_assets_year" @input="formatInput('average_assets_year')"
             type="text" placeholder="مقدار میانگین دارایی‌ها طی سال (در صورت دسترسی)">
      <input v-model="data.equity_end_period" @input="formatInput('equity_end_period')" type="text"
             placeholder="حقوق صاحبان سهام در پایان دوره">
      <input v-model="data.financial_expenses" @input="formatInput('financial_expenses')"
             type="text" placeholder="میزان هزینه‌های مالی (بهره وام‌ها و بدهی‌ها)">
      <input v-model="data.sales_change_percentage" @input="formatInput('sales_change_percentage')"
             type="text" placeholder="درصد تغییر فروش نسبت به سال قبل (اگر اطلاع داری)">
    </div>
    <button class="saveAndNext" @click="sendValues">
      ارسال مقادیر
    </button>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
}

.main h3 {
  color: red;
}

.main p {
  font-weight: bold;
}

.main .questions {
  height: 20vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10% 2%;
}

.main .questions input {
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  padding: 0 5%;
  background-color: #ffffff;
  font-size: 13px;
}

.main .questions input:hover {
  background-color: #f4f5f7;
}
</style>
