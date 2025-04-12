<script setup>
import {inject} from "vue";

const showStatus = inject("showStatus")
</script>

<template>
  <div class="main">
    <div class="profile">
      <div class="profilePic">
        <img src="../assets/user.png" alt="">
      </div>
      <div class="profileInfo">
        <ul>
          <li>نام و نام خانوادگی / نام شرکت</li>
          <li>شناسه ملی شرکت / کد ملی</li>
          <li>عارضه یابی های ناتمام</li>
          <li>عارضه یابی های تمام شده</li>
        </ul>
      </div>
    </div>
    <div class="complicationMain">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
    <div class="backwardLink">
      <router-link class="backward" to="/domains" @click="showStatus">
        بازگشت
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
}

.main .profile {
  width: 95%;
  height: max-content;
  display: flex;
  margin-right: 2vw;
  border: 1px solid;
}

.main .profile .profilePic {
  width: 8%;
  display: flex;
  align-items: center;
}

.main .profile .profilePic img{
  width: 100%;
  border-radius: 50%;
}

.main .profile .profileInfo {
  width: 92%;
  display: flex;
  align-items: center;
}

.main .profile .profileInfo ul{
  padding: 1vw;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.main .profile .profileInfo ul li{
  border-radius: 0;
  cursor: default;
  padding: 5px ;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main .complicationMain {
  width: 70%;
  height: 50vh;
  border: 1px solid;
  margin: 5vh auto 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;
  gap: 1%;

}

.main .complicationMain div{
  border: 1px solid;
  height: 20vh;
}

.main .backwardLink {
  width: 95%;
  height: 5vh;
  position: relative;
  margin-top: 5vh;
}

.main .backwardLink .backward {
  position: absolute;
  left: 0;
}
</style>
