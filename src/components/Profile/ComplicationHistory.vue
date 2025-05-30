<script setup>
import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import axios from "@/axios/axios.js";
import router from "@/router/index.js";
import {getTokenInfo} from "@/composables/composable.js";

const sortKey = ref('company');
const sortOrder = ref('asc');

let name = ref("");
let username = ref("");
let nationalID = ref("");
let is_company = ref(null);
const complications = reactive([]);
const controller = new AbortController();

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
  try {
    const history = await axios.get("questionnaires", {
      params: {username: username.value || nationalID.value},
      signal: controller.signal
    })

    for (const historyKey in history.data) {

      complications.push(history.data[historyKey]);
      await axios.get(`questionnaire/${history.data[historyKey].id}/status`, {
        params: {nationalID: nationalID.value},
        signal: controller.signal
      })

    }
  } catch (error) {
    if (error.name === "CanceledError") {
      console.log('درخواست لغو شد');
    } else {
      console.error('خطا در دریافت:', error);
    }
  }
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

async function handleCompleted(id) {
  const res = await axios.get(`questionnaire/${id}/status`, {params: {nationalID: nationalID.value}})
  if (res.data.domain === 4) {
    await router.push({name: 'FinancialResult', params: {result: JSON.stringify(res.data.report)}});
  } else {
    await router.push({name: 'Result', params: {result: JSON.stringify(res.data.report)}});
  }
}

async function handleNotPayed(id) {
  const res = await axios.get(`questionnaire/${id}/status`, {params: {nationalID: nationalID.value}})
  sessionStorage.setItem("questionnaire", id);
  if (res.data.domain === 4) {
    await router.push("/FinancialPayPage");
  } else {
    await router.push("/PayPage");
  }
}

async function handleNotCompleted(id) {
  const res = await axios.get(`questionnaire/${id}/status`, {params: {nationalID: nationalID.value}})
  const questionProp = {
    questionnaire: id,
    question: {}
  }

  Object.assign(questionProp.question, res.data.next_question)

  // await router.push({name: "Questions", params: {question: JSON.stringify(res.data.next_question)}})
  if (res.data.domain === 4) {
    await router.push({
      name: "FinancialQuestions",
      params: {question: JSON.stringify(questionProp)}
    })
  } else {
    await router.push({name: "Questions", params: {question: JSON.stringify(questionProp)}})
  }
}

function formattedDate(dateStr) {
  const [date, time] = dateStr.split('T');
  const formattedTime = time.split('.')[0];
  return `${formattedTime}    ${date}`;
}

onMounted(() => {
  fetchInfos();
})

onBeforeUnmount(() => {
  controller.abort();
})
</script>

<template>
  <div class="main">
    <div class="content">
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
            <th>مرحله</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history , index) in sortedComplications" :key="index">
            <td>{{ history.company }}</td>
            <td>{{ history.domain }}</td>
            <td>{{ formattedDate(history.created_at) }}</td>
            <td>
              <span
                :style="history.is_completed ? (history.is_paid ? 'color : green' : 'color : red' ) : 'color : red'">
                {{
                  history.is_completed ?
                    (history.is_paid ? "تمام شده" : "نا تمام")
                    : "نا تمام"
                }}
              </span>
            </td>
            <td>
              <div class="status"
                   @click="history.is_completed ? (history.is_paid ? handleCompleted(history.id) : handleNotPayed(history.id) ) : handleNotCompleted(history.id)">
                {{
                  history.is_completed ?
                    (history.is_paid ? "مشاهده گزارش" : "پرداخت")
                    : "ادامه عارضه یابی"
                }}
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-link class="link" to="/Profile">بازگشت</router-link>
  </div>
</template>

<style scoped>
.main {
  width: 75%;
  max-height: 70vh;
  height: max-content;
  background-color: white;
  padding: 0;
}

.main .content {
  height: 60vh;
  width: 95%;
  margin: 0 auto;
}

.main .content h3 {
  margin: 2vh 0;
  color: red;
}

.main .content h4 {
  margin-bottom: 2vh;
}

.main .content select {
  width: 15%;
  height: 10%;
  padding: 1vh 1vw;
  border: none;
  outline: none;
  border-radius: 15px;
  cursor: pointer;
}

.main .content select option {
  border-radius: 15px;
}

.main .content select:active {
  border: none;
  outline: none;
}

.main .content .historyContainer {
  width: 100%;
  height: 70%;
  overflow-y: auto;
  box-sizing: border-box;
  padding-left: 1vw;
}

.main .content .historyContainer table {
  width: 100%;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.main .content .historyContainer table tbody {
  margin-top: 1vh;
}

.main .content .historyContainer table tbody tr {
  height: 5vh;
  background-color: #f7f7f7;
  border-radius: 20px;
}

.main .content .historyContainer table tbody tr:hover {
  background-color: #e9e9e9;
  box-shadow: 0 0 15px 2px #e9e9e9;
}

.main .content .historyContainer table tbody tr > :first-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.main .content .historyContainer table tbody tr > :last-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.main .content .historyContainer table td {
  margin-bottom: 1vh;
}

.main .content .historyContainer .history .status {
  width: max-content;
  color: #0056b3;
  cursor: pointer;
  margin: 0 auto;
}

a {
  margin: 0 3vw 3vh 0;
  display: inline-block;
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
  bottom: -5px;
  right: 50%;
  transition: 200ms all ease;
}

a:hover::before {
  width: 100%;
  right: 0;
}

</style>
