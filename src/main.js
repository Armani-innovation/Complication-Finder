import "./assets/Main.css"
import {createApp} from 'vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";


import App from './App.vue'
import router from './router'

import {library} from "@fortawesome/fontawesome-svg-core";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {faSquarePollVertical} from "@fortawesome/free-solid-svg-icons";
import {faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import {faCoins} from "@fortawesome/free-solid-svg-icons"
import {faMoneyBillTrendUp} from "@fortawesome/free-solid-svg-icons";
import {faBuildingNgo} from "@fortawesome/free-solid-svg-icons";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {faBuildingColumns} from "@fortawesome/free-solid-svg-icons";
import {faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faFaceGrinTongueWink} from "@fortawesome/free-solid-svg-icons";

library.add(faUsers);
library.add(faCreditCard);
library.add(faSquarePollVertical);
library.add(faCircleQuestion);
library.add(faCoins);
library.add(faMoneyBillTrendUp);
library.add(faBuildingNgo);
library.add(faComments);
library.add(faBuildingColumns);
library.add(faScrewdriverWrench);
library.add(faMagnifyingGlass);
library.add(faFaceGrinTongueWink);



const app = createApp(App)
app.use(router)
app.use(createPinia())
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
