import { createApp } from "vue";
import App from "./App.vue";

import { createMemoryHistory, createRouter } from "vue-router";

import PageHome from "@/components/PageHome.vue";
// import AboutView from './AboutView.vue'

const routes = [
  { path: "/", component: PageHome },
  // { path: '/about', component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
