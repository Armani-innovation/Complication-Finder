<script setup>
import axios from "../axios/axios.js";
import router from "@/router/index.js";
import {computed, onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

let name = ref("");
let username = ref("");
let nationalID = ref("");
let is_company = ref(null);

let showHistory = ref(false);
let showedHistory = ref(false);

const complications = reactive([])
// const complicationsInfo = reactive([])

const sortKey = ref('company');
const sortOrder = ref('asc');


async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  name.value = infos.name;
  username.value = infos.username || null;
  nationalID.value = infos.nationalID || null;
  is_company.value = infos.is_company;
  // await fetchHistory();
}

async function fetchHistory() {
  const history = await axios.get("questionnaires", {params: is_company.value ? {nationalID: nationalID.value , is_company : is_company.value} : {username: username.value , is_company : is_company.value}})

  for (const historyKey in history.data) {

    complications.push(history.data[historyKey]);
    const res = await axios.get(`questionnaire/${history.data[historyKey].id}/status`, {params: {nationalID: nationalID.value}})

    // await new Promise(resolve => setTimeout(resolve, 50));
  }
}

function formattedDate(dateStr) {
  const [date, time] = dateStr.split('T');
  const formattedTime = time.split('.')[0];
  return `${formattedTime}    ${date}`;
}

function handleSignOut() {
  sessionStorage.clear();
  router.push("/signin");
}

function backward() {
  showHistory.value = false;
}

function showComplicationHistory() {
  showHistory.value = true;
  if (!showedHistory.value) fetchHistory()
  showedHistory.value = true;
}

function handleSortChange(event) {
  const selectedValue = event.target.value;
  if (selectedValue) {
    sortData(selectedValue);
  }
}

function sortData(key) {
  sortKey.value = key;
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}

const sortedComplications = computed(() => {
  return complications.slice().sort((a, b) => {
    let aValue = a[sortKey.value];
    let bValue = b[sortKey.value];

    if (sortKey.value === 'created_at') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
});

async function handleCompleted() {

}

async function handleNotCompleted(id) {

  const res = await axios.get(`questionnaire/${id}/status`, {params: {nationalID: nationalID.value}})

  const questionProp = {
    questionnaire: id,
    question: {}
  }

  Object.assign(questionProp.question, res.data.next_question)

  // await router.push({name: "Questions", params: {question: JSON.stringify(res.data.next_question)}})
  await router.push({name: "Questions", params: {question: JSON.stringify(questionProp)}})

}

function startComplication() {
  if (is_company.value) router.push("/domains")
  else router.push("/CompanyInfo")
}

onMounted(() => {
  fetchInfos();
})

</script>

<template>
  <div class="main">
    <div class="header">
      <div class="profile">
        <img src="@/assets/images/user.png" alt="">
        <div class="name">
          <h3 class="name">{{
              name || "در حال بارگذاری..."
            }}</h3>
          <h4 class="nationalId"> {{ is_company ? "شناسه ملی شرکت" : "کد ملی مشاور" }} :
            {{
              username || nationalID || "در حال بارگذاری..."
            }} </h4>
        </div>
      </div>
      <div class="setting">
        <span @click="handleSignOut" href="">خروج از حساب</span>
      </div>
    </div>
  </div>
  <div class="main" id="historyMain">
    <div class="content" v-if="showHistory">
      <h3>سوابق عارضه یابی</h3>
      <h4>تعداد عارضه یابی های انجام شده : {{ complications.length }}</h4>

      <select @change="handleSortChange" id="sort-select">
        <option value="" disabled selected>مرتب سازی بر اساس...</option>
        <option value="company">شرکت</option>
        <option value="domain">حوزه</option>
        <option value="created_at">تاریخ</option>
        <option value="is_completed">وضعیت</option>
      </select>

      <div class="historyContainer">
        <table class="history">
          <thead>
          <tr class="title">
            <th>نام شرکت</th>
            <th>حوزه</th>
            <th>تاریخ</th>
            <th>وضعیت</th>
          </tr>
          </thead>
          <tbody>
          <tr class="info" v-for="(history , index) in sortedComplications" :key="index">
            <td>{{ history.company }}</td>
            <td>{{ history.domain }}</td>
            <td>{{ formattedDate(history.created_at) }}</td>
            <td>
              <span :style="history.is_completed ? 'color : green' : 'color : red'">
                {{ history.is_completed ? "تمام شده" : "نا تمام" }}
              </span>
            </td>
            <td>
              <div class="status"
                   @click="history.is_completed ? handleCompleted : handleNotCompleted(history.id)">
                {{ history.is_completed ? "مشاهده وضعیت" : "ادامه عارضه یابی" }}
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-link v-if="showHistory" class="link" to="" @click="backward">بازگشت</router-link>
    <div class="optionsContainer" v-else>
      <div class="options">
        <button class="saveAndNext" @click="showComplicationHistory">
          سوابق عارضه یابی
        </button>
        <button class="saveAndNext">
          سوابق مالی
        </button>
        <router-link class="link" to="/signin">بازگشت</router-link>
      </div>
      <div class="startComplication">
        <!-- <img src="@/assets/images/Artboard%201.png" alt=""> -->
        <button class="saveAndNext" @click="startComplication">
          {{ is_company ? "عارضه یابی شرکت خودم" : "شروع عارضه یابی" }}
        </button>
        <router-link to="/CompanyInfo" v-if="is_company" class="saveAndNext">
          عارضه یابی دیگر شرکت ها
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#historyMain {
  padding: 0;
  height: max-content;
}

.main {
  width: 75%;
  max-height: 70vh;
  background-color: white;
}

.main .header {
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main .header .profile {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.main .header .profile img {
  height: 65%;
}

.main .header .setting {
  display: flex;
  gap: 10px;
}

.main .header .setting span {
  color: red;
  cursor: pointer;
}

.main .header .setting a::before {
  color: red;
}

.main .profile .name {
  display: flex;
  flex-direction: column;
}

.main .content {
  height: 60vh;
  width: 95%;
  margin: 0 auto;
}

.main .content h3 {
  margin: 1vh 0;
  color: red;
}

.main .content h4 {
  margin-bottom: 2vh;
}

.main .content .historyContainer {
  width: 100%;
  height: 70%;
  margin-top: 3vh;
  overflow-y: auto;
}

.main .content .historyContainer .history {
  text-align: center;
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table td {
  margin-bottom: 1vh;
}

table tr {
  border-bottom: 2px solid black;
}

select {
  border: none;
  outline: none;
}

.main .content .historyContainer .history .status {
  width: max-content;
  color: #0056b3;
  cursor: pointer;
  margin: 0 auto;
}

select:active {
  border: none;
  outline: none;
}

.main .optionsContainer {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.main .optionsContainer .options {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.main .optionsContainer .options .saveAndNext {
  background: none;
  color: #0056b3;
  margin: 2vh auto;
}

.main .optionsContainer .options .link {
  margin: 2vh auto;
}

.main .optionsContainer .startComplication {
  background-image: url("@/assets/images/Capture.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 70%;
  height: 50vh;
  display: flex;
  align-items: end;
  justify-content: center;
}

.main .optionsContainer .startComplication .saveAndNext {
  background: none;
  width: max-content;
  margin: 5vh 2vw;
  font-size: 13px;
  border: 2px solid #ffffff;
}

.main .optionsContainer .startComplication a {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.5vw;
}

.main .optionsContainer .startComplication a:hover::before {
  width: 0;
}

.main .optionsContainer .startComplication img {
  width: 100%;
  height: 100%;
}

.main .link {
  margin: 10vh 5vw;
}


a {
  display: inline;
  text-decoration: none;
  color: #0056b3;
  position: relative;
  z-index: 0;
  cursor: pointer;
}

a::before {
  position: absolute;
  content: "";
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: 0;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}

</style>
