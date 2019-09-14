import "../css/style.scss";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import ymaps from "ymaps";
import VueAwesomeSwiper from "vue-awesome-swiper";

// require styles
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper /* { default global options } */);

import router from "./front/Router.js";

import App from "./front/App.vue";

Vue.use(VueRouter);
//Vue.use(Vuex);
import store from "./front/Store.js";

/*window.onload = () => {
  let recaptchaScript = document.createElement("script");
  recaptchaScript.setAttribute(
    "src",
    "https://api-maps.yandex.ru/2.1.73/?lang=ru_RU"
  );
  document.head.appendChild(recaptchaScript);

  recaptchaScript.onload = () => {
    if (ymaps) {
      Vue.prototype.$ymaps = ymaps;
    }

   
  };
};*/
ymaps
  .load(
    "https://api-maps.yandex.ru/2.1.73/?lang=ru_RU&apikey=93491df5-c582-404c-82ea-893f7da5572e"
  )
  .then(map => {
    Vue.prototype.$ymaps = map;
    const app = new Vue({
      el: "#app",
      created() {},
      router,
      store,
      render: h => h(App)
    });
  })
  .catch(e => {
    console.error(e);
  });
