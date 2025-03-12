import { createRouter, createWebHistory } from "vue-router";

import Question from "@/components/Question.vue";
import Welcome from "@/components/Welcome.vue";
import Domain from "@/components/Domain.vue";
import PayPage from "@/components/PayPage.vue";
import Result from "@/components/Result.vue";
import CompanyInfo from "@/components/CompanyInfo.vue";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import FullComplication from "@/components/FullComplication.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "Welcome", component: Welcome, path: "/"},
    { name: "SignIn", component: SignIn, path: "/SignIn"},
    { name: "SignUp", component: SignUp, path: "/SignUp"},
    { name: "CompanyInfo", component: CompanyInfo, path: "/CompanyInfo/"},
    { name: "Domain", component: Domain, path: "/domains/"},
    { name: "Questions", component: Question, path: "/questions/:domain", props: true},
    { name: "PayPage", component: PayPage, path: "/PayPage"},
    { name: "Result", component: Result, path: "/result" },
    { name: "FullComplication", component: FullComplication, path: "/FullComplication" },
  ],
});

export default router;
