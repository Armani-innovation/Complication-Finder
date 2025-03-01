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
  min-width: 300px;
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vw;
  text-align: center;
  margin: 5vh auto;
}

.main pre {
  font-family: "B Yekan", cursive;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.main ul {
  width: 80%;
  max-width: 500px;
  height: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  justify-content: center;
  grid-gap: 2vh 5vw;
  margin: 0 auto;
  padding: 0;
}

.main ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #f4f5f7;
  cursor: pointer;
  padding: 1vh;
  transition: all 0.3s ease;
}

.main ul li:hover {
  background-color: #e0e0e0;
}

.main ul li label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 1vh;
}

.main .saveAndNext {
  width: 15vw;
  max-width: 200px;
  height: 5vh;
  border-radius: 10px;
  border: 0;
  margin: 5vh auto;
  background-color: #0d6efd;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: "B Yekan", cursive;
  transition: all 0.3s ease;
}

.main .saveAndNext:hover {
  background-color: #0056b3;
}

.main .saveAndNext:active {
  border: 2px solid #ffffff;
}

@media screen and (max-width: 768px) {
  .main {
    width: 90%;
    padding: 4vh 4vw;
  }

  .main ul {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 2vh;
  }

  .main .saveAndNext {
    width: 80%;
    max-width: 180px;
    margin: 5vh auto 0 auto;
  }
}

@media screen and (max-width: 1024px) {
  .main {
    width: 70%;
  }

  .main ul {
    grid-template-columns: repeat(2, 1fr);
  }
}


</style>
