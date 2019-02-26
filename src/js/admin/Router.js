import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/", component: require("./Main.vue").default
        },
        {
            path: "/users", component: require("./tableList.vue").default
        },
        {
            path: "/users/add", component: require('./User/User.vue').default
        }
    ]
})