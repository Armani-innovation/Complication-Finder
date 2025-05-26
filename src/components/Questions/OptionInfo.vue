<script setup>
const props = defineProps(["optionInfo"])
const info = props.optionInfo
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <div class="info" @mouseenter="show = true" @mouseleave="show = false">
    <font-awesome-icon icon="info"/>
    <div v-if="show" class="tooltip">
      <p>{{ info }}</p>
    </div>
  </div>
</template>

<style scoped>
.info {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  padding: 1% 1%;
  border-radius: 10px;
  border: 2px solid #b0b0b0;
  cursor: pointer;
}
.info:hover {
  background-color: #b0b0b0;
  color: white;
}
.tooltip {
  width: 20vw;
  position: absolute;
  left: 110%;
  background-color: #b0b0b0;
  color: white;
  border-radius: 5px;
  text-align: center;
}
</style>
