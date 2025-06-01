import {createRouter, createWebHistory} from "vue-router";

import Question from "@/components/Questions/Question.vue";
import Welcome from "@/components/Welcome.vue";
import Domain from "@/components/Domains/Domain.vue";
import PayPage from "@/components/PayPage/PayPage.vue";
import Result from "@/components/Results/Result.vue";
import CompanyInfo from "@/components/Domains/CompanyInfo.vue";
import SignIn from "@/components/Autentications/SignIn.vue";
import SignUp from "@/components/Autentications/SignUp.vue";
import Profile from "@/components/Profile/Profile.vue";
import FinancialQuestions from "@/components/Questions/FinancialQuestions.vue";
import FinancialResult from "@/components/Results/FinancialResult.vue";
import ProfileOptions from "@/components/Profile/ProfileOptions.vue";
import ComplicationHistory from "@/components/Profile/ComplicationHistory.vue";
import FinancialPayPage from "@/components/PayPage/FinancialPayPage.vue";
import EditProfile from "@/components/Profile/EditProfile.vue";
import SuccessfulPay from "@/components/PayPage/SuccessfulPay.vue";
import UnsuccessfulPay from "@/components/PayPage/UnsuccessfulPay.vue";

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
    {name: "Result", component: Result, path: "/result/:result", props: true},
    {name: "FinancialPayPage", component: FinancialPayPage, path: "/FinancialPayPage"},
    {
      name: "FinancialQuestions",
      component: FinancialQuestions,
      path: "/FinancialQuestions/:question",
      props: true
    },
    {
      name: "FinancialResult",
      component: FinancialResult,
      path: "/FinancialResult/:result",
      props: true
    },
    {
      name: "Profile",
      component: Profile,
      path: "/Profile",
      children: [{
        name: "ProfileOptions",
        component: ProfileOptions,
        path: ""
      }, {
        name: "ComplicationHistory",
        component: ComplicationHistory,
        path: "/ComplicationHistory"
      }, {
        name: "EditProfile",
        component: EditProfile,
        path: "/EditProfile"
      }]
    },
    {
      name: "FinancialQuestions",
      component: FinancialQuestions,
      path: "/FinancialQuestions"
    },
    {name: "SuccessfulPay" , component: SuccessfulPay , path : "/SuccessfulPay"},
    {name: "UnsuccessfulPay" , component: UnsuccessfulPay , path : "/UnsuccessfulPay"},
  ],
});

export default router;
