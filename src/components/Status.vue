<script setup>
import {ref, watch} from "vue";
import {useRoute} from 'vue-router'

const description = ref(null);
const descriptionTitle = ref(null);

const infos = ref(null)
const infosTitle = ref(null)

const complication = ref(null)
const complicationTitle = ref(null)

const credits = ref(null)
const creditsTitle = ref(null)

const result = ref(null)
const resultTitle = ref(null)

const route = useRoute()

watch(() => route.name, (newName) => {
  switch (newName) {
    case "Welcome" :
      welcome()
      break;
    case "CompanyInfo" :
      companyInfo()
      break;
    case "Questions" :
      questions()
      break;
    case "PayPage" :
      payPage()
      break;
    case "Result" :
      finalResult()
      break;
  }
})

function welcome() {
  description.value.$el.classList.add("now")
  descriptionTitle.value.classList.add("now")
}

function companyInfo() {
  description.value.$el.classList.add("passed")
  descriptionTitle.value.classList.add("passed")
  infos.value.$el.classList.add("now")
  infosTitle.value.classList.add("now")
}

function questions() {
  infos.value.$el.classList.add("passed")
  infosTitle.value.classList.add("passed")
  complication.value.$el.classList.add("now")
  complicationTitle.value.classList.add("now")
}

function payPage() {
  complication.value.$el.classList.add("passed")
  complicationTitle.value.classList.add("passed")
  credits.value.$el.classList.add("now")
  creditsTitle.value.classList.add("now")
}

function finalResult() {
  credits.value.$el.classList.add("passed")
  creditsTitle.value.classList.add("passed")
  result.value.$el.classList.add("now")
  resultTitle.value.classList.add("now")
}
</script>

<template>
  <div class="main">
    <ul>
      <li>
        <div class="icons">
          <font-awesome-icon ref="description" class="icon" icon="handshake"/>
          <h4 class="" ref="descriptionTitle">معرفی عارضه یاب</h4>
        </div>
      </li>
      <li>
        <img class="svg" src="./../assets/svg-image-3.svg" alt="">
        <div class="icons">
          <font-awesome-icon ref="infos" class="icon" icon="info"/>
          <h4 class="" ref="infosTitle">اطلاعات شرکت</h4>
        </div>
      </li>
      <li>
        <img class="svg" src="./../assets/svg-image-3.svg" alt="">
        <div class="icons">
          <font-awesome-icon ref="complication" class="icon" icon="circle-question"/>
          <h4 class="" ref="complicationTitle">سوالات عارضه یابی</h4>
        </div>
      </li>
      <li>
        <img class="svg" src="./../assets/svg-image-3.svg" alt="">
        <div class="icons">
          <font-awesome-icon ref="credits" class="icon" icon="credit-card"/>
          <h4 class="" ref="creditsTitle">پرداخت</h4>
        </div>
      </li>
      <li>
        <img class="svg" src="./../assets/svg-image-3.svg" alt="">
        <div class="icons">
          <font-awesome-icon ref="result" class="icon" icon="square-poll-vertical"/>
          <h4 class="" ref="resultTitle">گزارش نهایی</h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 3vh;
}

.main ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5 , 1fr);
  list-style: none;
  padding: 0;
}

.main ul li {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main ul li .svg{
  width: 40%;
  height: auto;
}

.main ul li .icons{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main ul li .icons h4 {
  margin: 0;
  opacity: 0.5;
  font-size: 1vw;
}

.main ul li .icon {
  font-size: 3vw;
  opacity: 0.4;
}

.main ul li .now {
  opacity: 1;
  color: #4848ff;
}

.main ul li .now {
  opacity: 1;
  color: #4848ff;
}

.main ul li .passed {
  opacity: 1;
  color: green;
}

.main ul li .passed {
  opacity: 1;
  color: green;
}

@media screen and (max-width: 480px) {
  .main {
    width: 90%;
  }
}

@media screen and (max-width: 992px) {
  .main {
    width: 90%;
  }
}
</style>
