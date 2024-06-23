import { createApp } from "vue";
import App from "./App.vue";
import "@/style/output.css";
import router from "@/routes/index";
import AppDate from "@/components/AppDate.vue";

const app = createApp(App);
app.use(router);
app.component("AppDate", AppDate);
app.mount("#app");
