//import Vue from 'vue';
import VueRouter from 'vue-router';
import store  from './Store.js';
/*
 * 
 * 
 */
import LoginPage from './pages/Login.vue';
import Registration from './pages/Registration.vue';
import MainPage from './pages/Main.vue';
import Catalog from './pages/Catalog.vue';
import UserPage from './pages/UserPage.vue';

let routes = [

  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/registration',
    component: Registration
  },
  {
    path: '/account',
    component: UserPage,
    beforeEnter:(to,from,next)=>{
     
      console.log(store);
      if(store.getters.isAuth==false){
        next({
          path:'/login'
        })
      }else{
        next();
      }
    
     // 
    }
  },
  {
    path: '/catalog',
    component: Catalog
  },
  {
    path: '/',
    component: MainPage
  },
]
export default new VueRouter({
  routes
})