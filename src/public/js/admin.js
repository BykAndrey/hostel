import "../css/admin.css";

import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import router from "./admin/Router.js";
import App from "./admin/App.vue";
import store from "./admin/Store.js";
let app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
