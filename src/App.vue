<script setup>
import Status from "@/components/Status.vue";
import {useRoute} from "vue-router";

const route = useRoute();

</script>

<template>
  <div class="container">

    <video class="background-video" autoplay loop muted playsinline>
      <source src="./assets/1.mp4" type="video/mp4"/>
      مرورگر شما از ویدئوی HTML5 پشتیبانی نمی‌کند.
    </video>

<!--    <Status v-if="route.name !== 'Profile' && route.name !== 'ComplicationHistory'" class="status"/>-->
    <Status v-show="route.name !== 'Profile' && route.name !== 'ComplicationHistory'" class="status"/>
    <RouterView/>
    <img class="logo" src="./assets/images/logo1.png" alt="">
  </div>
</template>

<style scoped>
.container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container .logo {
  width: 6vw;
  position: absolute;
  left: 5vw;
  bottom: 5vh;
  z-index: 1;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

@media screen and (max-width: 1279px) {
  .container .header {
    width: 90%;
  }

  .container .header h1 {
    font-size: 24px;
  }

  .container .header .userName .icon {
    font-size: 20px;
  }

  .container .header .userName h3 {
    font-size: 18px;
  }
}

@media screen and (max-width: 768px) {
  .container .header {
    width: 100%;
  }

  .container .header h1 {
    font-size: 20px;
  }

  .container .header .userName .icon {
    font-size: 18px;
  }

  .container .header .userName h3 {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {
  .container .header {
    height: 40px;
  }

  .container .header h1 {
    font-size: 13px;
  }

  .container .header .userName .icon {
    font-size: 11px;
  }

  .container .header .userName h3 {
    font-size: 9px;
  }
}

</style>
