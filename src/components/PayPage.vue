<script setup>

</script>

<template>
  <div class="main">
    <pre>
      عارضه یابی شما با موفقیت انجام شد
      لطفا برای مشاهده گزارش مبلغ 5,000,000 تومان را پرداخت کنید
    </pre>
    <router-link to="/result">
      <button class="saveAndNext">
        پرداخت و مشاهده نتیجه
      </button>
    </router-link>

  </div>
</template>

<style scoped>
.main {
  width: 50%;
  height: 55vh;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vh;
  position: relative;
}

.main pre {
  font-family: "B Yekan", cursive;
}

.main ul {
  width: 80%;
  height: 80%;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  grid-gap: 2vh 5vw;
  margin: 0 auto;
  padding: 0;
}

.main ul li {
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: #f4f5f7;
}

.main ul li label{
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.main .saveAndNext {
  width: 15vw;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  position: absolute;
  left: 5vh;
  bottom: 5vh;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}
</style>
