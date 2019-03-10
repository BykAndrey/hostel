import VueRouter from 'vue-router';

/**
 * 
 * 
 */
import LoginPage from './pages/Login.vue';
import MainPage from './pages/Main.vue';

let routes=[
    {
        path:'/',
        component:MainPage
    },
    {
        path:'/login',
        component:LoginPage
    }
]
export default new VueRouter({
  routes
})