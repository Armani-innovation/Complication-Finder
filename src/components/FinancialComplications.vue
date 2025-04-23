<script setup>

</script>

<template>
<div class="main">
  <h3>عارضه یابی مالی</h3>
  <p>لطفا به سوالات زیر با توجه به صورت سود و زیان و ترازنامه سال مالی گذشته پاسخ دهید: (مقادیر را به عدد و به واحد ریال وارد کنید)</p>
  <div class="questions">
    <input type="text" placeholder="میزان فروش خالص (درآمد کل)">
    <input type="text" placeholder="سود خالص دوره (پس از کسر همه هزینه‌ها، مالیات و بهره)">
    <input type="text" placeholder="مجموع دارایی‌ها در پایان دوره">
    <input type="text" placeholder="مقدار میانگین دارایی‌ها طی سال (در صورت دسترسی)">
    <input type="text" placeholder="حقوق صاحبان سهام در پایان دوره">
    <input type="text" placeholder="میزان هزینه‌های مالی (بهره وام‌ها و بدهی‌ها)">
    <input type="text" placeholder="درصد تغییر فروش نسبت به سال قبل (اگر اطلاع داری)">
  </div>
  <button class="saveAndNext">
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
  grid-template-columns: repeat(3 , 1fr);
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
