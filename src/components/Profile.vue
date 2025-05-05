<script setup>
// import {onMounted, reactive, computed} from "vue";
import axios from "../axios/axios.js";
import router from "@/router/index.js";
import {computed, onMounted, reactive, ref} from "vue";
import {getTokenInfo} from "@/composables/composable.js";

let name = ref("");
let username = ref("");
let nationalID = ref("");
let is_company = ref(null);

const complications = reactive([])
const complicationsInfo = reactive([])

const sortKey = ref('company');
const sortOrder = ref('asc');


async function fetchInfos() {
  const token = sessionStorage.getItem("token");
  const infos = await getTokenInfo(token);
  name.value = infos.name;
  username.value = infos.username || null;
  nationalID.value = infos.nationalID || null;
  is_company.value = infos.is_company;
  await fetchHistory();
}

async function fetchHistory() {
  const history = await axios.get("questionnaires", {params: is_company.value ? {nationalID: nationalID.value} : {usename: username.value}})
  console.log(history.data)

  for (const historyKey in history.data) {

    complications.push(history.data[historyKey]);
    const res = await axios.get(`questionnaire/${history.data[historyKey].id}/status`, {params: {nationalID: nationalID.value}})
    complicationsInfo.push(res.data)
    console.log(res.data)

    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

function formattedDate(dateStr){
  const [date, time] = dateStr.split('T');
  const formattedTime = time.split('.')[0];
  return `${formattedTime}    ${date}`;
}

function handleSignOut() {
  sessionStorage.clear();
  router.push("/signin");
}

function backward() {
  router.back();
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
        <font-awesome-icon @click="handleSignOut" id="logout" icon="power-off"/>
        <a href="">تماس با ما</a>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="content">
      <h3>سوابق عارضه یابی</h3>
      <h4>تعداد عارضه یابی های انجام شده : {{ complications.length }}</h4>

      <div class="historyContainer">
        <!--        <div class="history">-->
        <!--          <div class="items" v-for="(history , index) in complications" :key="index">-->
        <!--            <div class="info">-->
        <!--              <h5>در تاریخ : {{ history.created_at }}</h5>-->
        <!--              <h5>برای شرکت : {{ history.company }}</h5>-->
        <!--              <div class="status">-->
        <!--                <h5> وضعیت : <span :style="history.is_completed ? 'color : green' : 'color : red'"> {{-->
        <!--                    history.is_completed ? "تمام شده" : "نا تمام"-->
        <!--                  }} </span></h5>-->
        <!--                <h5 style="color : #0056b3">-->
        <!--                  {{ history.is_completed ? "مشاهده وضعیت" : "ادامه عارضه یابی" }} </h5>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <table class="history">
          <thead>
          <tr class="title">
            <th>نام شرکت</th>
            <th>حوزه</th>
            <th>تاریخ</th>
            <th>وضعیت</th>
            <th>
              <select @change="handleSortChange" id="sort-select">
                <option value="" disabled selected>مرتب سازی بر اساس...</option>
                <option value="company">شرکت</option>
                <option value="domain">حوزه</option>
                <option value="created_at">تاریخ</option>
              </select>
            </th>
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
              <router-link to="">
                {{ history.is_completed ? "مشاهده وضعیت" : "ادامه عارضه یابی" }}
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-link class="link" to="" @click="backward">بازگشت</router-link>
  </div>
</template>

<style scoped>
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
  flex-direction: column;
  gap: 10px;
}

.main .header .setting #logout {
  font-size: 20px;
  color: red;
  cursor: pointer;
}

.main .profile .name {
  display: flex;
  flex-direction: column;
}

.main .content {
  height: 60vh;
}

.main .content h3 {
  margin: 1vh 0;
  color: red;
}

.main .content .historyContainer {
  width: 100%;
  height: 79%;
  margin-top: 3vh;
  overflow-y: auto;
}

.main .content .historyContainer .history {
  text-align: center;
  width: 100%;
}

.main .content .historyContainer .history thead {
  border: 1px solid green;
}

.main .content .historyContainer .history .title th select {
  border: none;
  outline: none;
}

.main .content .historyContainer .history .title th select:active {
  border: none;
  outline: none;
}

/*
.main .content .historyContainer .history .items {
  width: 100%;
  margin: 2vh 0;
}

.main .content .historyContainer .history .items .info {
  min-width: 20vw;
  height: 15vh;
  border: 1px solid red;
  margin-bottom: 1vh;
  cursor: pointer;
}

.main .content .historyContainer .history .items .info h5 {
  margin: 1vh;
}

.main .content .historyContainer .history .items .info .status {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
*/

.main .link {
  margin-top: 10vh;
}
</style>
