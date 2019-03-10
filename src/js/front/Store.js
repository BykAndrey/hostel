import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        idUser:undefined,
        user:undefined,
    },
    mutations:{
        setUser(state,payload){
            console.log('state.user'+state.user)
            state.idUser=payload.id;
            state.user=payload.user;
            console.log('state.user'+state.user.name)
        } ,
        clearSession(state,payload){
            state.idUser=undefined;
            state.user=undefined;
        }  
    },
    actions:{
        sessionUser(context,payload){
            axios.get('/api/current-user',{

            }).then(function(res){
                console.log(res.data.id);
                if(res.data.id!==undefined){
                    console.log(res);
                    context.commit('setUser',res.data)
                }
                
            });
            
        }
    }
})