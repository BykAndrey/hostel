import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        server:'http://localhost:3000',
        idUser:undefined,
        user:undefined,
    },
    getters:{
        isAuth:(state)=>state.idUser!==undefined?true:false,
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
           axios.get(context.state.server+'/api/current-user',{

            }).then(function(res){
                console.log("session="+res.data.id);
                if(res.data.id!==undefined){
                    console.log(res);
                    context.commit('setUser',res.data);
                    if(payload!==undefined){
                        payload.cb!==undefined?payload.cb():'';
                    }
                    
                }
                
            });
            
        },
        
    }
})