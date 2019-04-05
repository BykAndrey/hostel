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
import EditBuilder from './pages/EditBuilder.vue'
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
      store.dispatch('sessionUser',{cb:function(){
        console.log('store.getters.isAuth='+store.getters.isAuth)
        if(store.getters.isAuth==false){
          next({
            path:'/login'
          })
        }else{
          next();
        }
      }})
      
    
     // 
    }
  },

  {
    path:'/:id/edit',
    component:EditBuilder
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