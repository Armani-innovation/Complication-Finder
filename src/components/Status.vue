<script setup>
//
//import { computed, getCurrentInstance } from "vue";
//
//const instance = getCurrentInstance();
//const currentComponent = computed(() => {
//  return instance?.proxy?.$route?.matched?.[0]?.components?.default?.__name || "نامشخص";
//});
//
//console.log(currentComponent.value);
</script>

<template>
  <div class="main">
    <ul>
      <li>
        <font-awesome-icon class="icon" icon="circle-question"/>
        <h4>سوالات عمومی</h4>
      </li>
      <li>
        <font-awesome-icon class="icon" icon="credit-card"/>
        <h4>پرداخت</h4>
      </li>
      <li>
        <font-awesome-icon class="icon" icon="square-poll-vertical"/>
        <h4>گزارش نهایی</h4>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 3vh;
}

.main ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
}

.main ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main ul li h4 {
  margin: 0;
  opacity: 0.5;
}

.main ul li .icon {
  font-size: 3vw;
  opacity: 0.4;
}
</style>
