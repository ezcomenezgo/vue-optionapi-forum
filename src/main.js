import { createApp } from "vue";
import App from "./App.vue";
import "@/style/output.css";
import router from "@/routes/index";

const app = createApp(App);
app.use(router);
app.mount("#app");
