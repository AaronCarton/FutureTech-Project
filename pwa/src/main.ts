import { App as VueApp, createApp } from "vue";

import "@unocss/reset/tailwind.css";
import "uno.css";

import App from "./App.vue";
import router from "./router";

// APP INSTANCE
const app: VueApp = createApp(App);

(async function () {
  app.use(router);
  app.mount("#app");
})();
