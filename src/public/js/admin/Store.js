import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        server: "http://localhost:3000",
        auth: false
    },
    mutations: {
        login(state) {
            state.auth = true;
        },
        logout(state) {
            state.auth = false;
        }
    }
});
