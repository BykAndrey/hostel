import "../css/admin.css";

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import router from "./admin/Router.js";
import App from "./admin/App.vue";

let app = new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
