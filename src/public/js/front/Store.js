import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        server: "http://localhost:3000",
        idUser: undefined,
        user: undefined,
        token: "",
        userData: null,
        cookie: null
    },
    getters: {
        isAuth: state => (state.idUser !== undefined ? true : false)
    },

    mutations: {
        setUser(state, payload) {
            state.idUser = payload.id;
            state.user = payload.user;
        },
        clearSession(state, payload) {
            state.idUser = undefined;
            state.user = undefined;
        },
        setToken(state, payload) {
            state.token = payload;
            document.cookie = `_token=${payload};_time=${new Date()}`;
        },
        removeToken(state) {
            state.token = "";
            document.cookie = "_token=;";
        },
        getCookie() {},
        setUserData(state, payload) {
            state.userData = payload;
        },
        setUserDataCookie(state, payload) {
            document.cookie = `_token=${payload.token}`;
            document.cookie = `_name=${payload.name}`;
        },
        removeUserData(state) {
            state.userData = null;
            document.cookie = `_token=`;
            document.cookie = `_name=`;
        },
        setCookie(state, payload) {
            state.cookie = payload;
        }
    },
    actions: {
        sessionUser(context, payload) {
            axios
                .get(context.state.server + "/api/current-user", {})
                .then(function(res) {
                    if (res.data.id !== undefined) {
                        context.commit("setUser", res.data);
                        if (payload !== undefined) {
                            payload.cb !== undefined ? payload.cb() : "";
                        }
                    }
                });
        },
        GET_COOKIE({ commit }) {
            return new Promise((res, rej) => {
                let cookieString = document.cookie;
                let mas = cookieString.split(";");

                let dt = {};
                mas.forEach(e => {
                    let cooka = e.split("=");

                    if (cooka.length >= 2) {
                        dt[cooka[0].trim()] = cooka[1].trim();
                    }
                });
                commit("setCookie", dt);

                res(dt);
            });
        },
        CHECK_USER({ state, commit }) {
            return new Promise((res, rej) => {
                if (
                    state.cookie &&
                    state.cookie._token !== null &&
                    state.cookie._token !== undefined &&
                    state.cookie._token !== ""
                ) {
                    commit("setUserData", {
                        token: state.cookie._token,
                        name: state.cookie._name
                    });
                    res();
                } else {
                    rej();
                }
            });
        },
        GET_PROFILE({ state, commit }) {
            axios({
                method: "get",
                url: `${state.server}/api/profile`,
                headers: {
                    Authorization: `Bearer ${state.userData.token}`
                }
            })
                .then(({ data }) => {
                    commit("setUserData", data);
                })
                .catch(er => {
                    console.error(er);
                });
        }
    }
});
