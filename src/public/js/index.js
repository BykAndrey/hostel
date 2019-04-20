import "../css/style.css";



import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import router from './front/Router.js';

import App from './front/App.vue';



Vue.use(VueRouter);
//Vue.use(Vuex);
import store from './front/Store.js';
const app=new Vue({
    el:"#app",
    created(){
       
    },
    router,
    store,
    render:h=>h(App)
})