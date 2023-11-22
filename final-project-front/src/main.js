import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueGoodTablePlugin from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

// app.use(createPinia());
app.use(pinia);
app.use(router);
app.use(VueGoodTablePlugin);

app.mount("#app");
