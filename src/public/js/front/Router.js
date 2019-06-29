//import Vue from 'vue';
import VueRouter from "vue-router";
import store from "./Store.js";
/*
 *
 *
 */
import LoginPage from "./pages/Login.vue";
import Registration from "./pages/Registration.vue";
import MainPage from "./pages/Main.vue";
import Catalog from "./pages/Catalog.vue";
import UserPage from "./pages/UserPage.vue";
import EditBuilder from "./pages/EditBuilder.vue";
import build from "./pages/build.vue";
let routes = [
  {
    path: "/login",
    component: LoginPage,
    beforeEnter(to, from, next) {
      if (!store.state.userData) {
        next();
      } else {
        next("/account");
      }
    }
  },
  {
    name: "registration",
    path: "/registration",
    component: Registration,
    beforeEnter(to, from, next) {
      if (!store.state.userData) {
        next();
      } else {
        next("/account");
      }
    }
  },
  {
    name: "account",
    path: "/account",
    component: UserPage,
    beforeEnter(to, from, next) {
      if (store.state.userData) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    name: "catalog",
    path: "/catalog",
    component: Catalog
  },
  {
    name: "edit",
    path: "/:id/edit",
    component: EditBuilder
  },
  {
    path: "/:id",
    component: build
  },
  {
    path: "/",
    component: MainPage
  }
];
export default new VueRouter({
  //mode: "history",
  routes
});
