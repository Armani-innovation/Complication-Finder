import {createRouter, createWebHistory} from "vue-router";

import Question from "@/components/Questions/Question.vue";
import Welcome from "@/components/Welcome.vue";
import Domain from "@/components/Domains/Domain.vue";
import PayPage from "@/components/PayPage.vue";
import Result from "@/components/Results/Result.vue";
import CompanyInfo from "@/components/Domains/CompanyInfo.vue";
import SignIn from "@/components/Autentications/SignIn.vue";
import SignUp from "@/components/Autentications/SignUp.vue";
import Profile from "@/components/Profile/Profile.vue";
import FinancialComplications from "@/components/Questions/FinancialComplications.vue";
import HistoryResult from "@/components/Results/HistoryResult.vue";
import ProfileOptions from "@/components/Profile/ProfileOptions.vue";
import ComplicationHistory from "@/components/Profile/ComplicationHistory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {name: "Welcome", component: Welcome, path: "/"},
    {name: "SignIn", component: SignIn, path: "/SignIn"},
    {name: "SignUp", component: SignUp, path: "/SignUp"},
    {name: "CompanyInfo", component: CompanyInfo, path: "/CompanyInfo"},
    {name: "Domain", component: Domain, path: "/domains"},
    {name: "Questions", component: Question, path: "/questions/:question", props: true},
    {name: "PayPage", component: PayPage, path: "/PayPage"},
    {name: "Result", component: Result, path: "/result"},
    {
      name: "Profile",
      component: Profile,
      path: "/Profile",
      children: [{
        name: "ProfileOptions",
        component: ProfileOptions,
        path: "/Profile"
      }, {
        name: "ComplicationHistory",
        component: ComplicationHistory,
        path: "/Profile/ComplicationHistory"
      }]
    },
    {
      name: "FinancialComplications",
      component: FinancialComplications,
      path: "/FinancialComplications"
    },
    {name: "HistoryResult", component: HistoryResult, path: "/HistoryResult"},
  ],
});

export default router;
