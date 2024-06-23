import { createStore } from "vuex";
import sourceData from "@/data.json";

const store = createStore({
  state() {
    return {
      sourceData,
    };
  },
});

export default store;
