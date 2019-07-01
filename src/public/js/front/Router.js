//import Vue from 'vue';
import VueRouter from "vue-router";
import store from "./Store.js";
import LoginPage from "./pages/Login.vue";
import Registration from "./pages/Registration.vue";
import MainPage from "./pages/Main.vue";
import Catalog from "./pages/Catalog.vue";
import UserPage from "./pages/UserPage.vue";
import EditBuilder from "./pages/EditBuilder.vue";
import build from "./pages/build.vue";
import about from "./pages/About.vue";

function CheckUser(to, from, next) {
    store.dispatch("GET_COOKIE").then(() => {
        store.dispatch("CHECK_USER").then(() => {
            if (store.state.userData) {
                next("/account");
            } else {
                next();
            }
        });
    });
}
let routes = [
    {
        path: "/about",
        component: about
    },
    {
        path: "/login",
        component: LoginPage,
        beforeEnter: CheckUser
    },
    {
        name: "registration",
        path: "/registration",
        component: Registration,
        beforeEnter: CheckUser
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
        component: Catalog
    }
];
export default new VueRouter({
    routes
});
