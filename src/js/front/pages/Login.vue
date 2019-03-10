<template lang="pug">
    form.p-login(action="/login",@submit="checkForm")
        .p-login__wrap.container
            h2.p-login__title Авторизация 
            p {{errors}}
            p {{response}} 
            div andreybyk9606@gmail.com
            label
                b Login:
                input.c-input(type="mail",v-model="login")
            label
                b Password
                input.c-input(type="password",v-model="password")
            button.c-btn(type="submit") Войти        
</template>
<script>
const axios=require('axios');
const qs=require('qs');;
export default {
    name:'login',
    data(){
        return {
            errors:[],
            login:'andreybyk9606@gmail.com',
            password:'password',
            response:'asdf'
        }
    },
    methods:{
        checkForm(e){
             e.preventDefault();
               
            var self=this;
            //self.$store.dispatch('sessionUser')
            var data={
                mail:self.login,
                password:self.password
            }
             axios({
                    method:'post',
                    url:'/api/login',
//headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                     data:data
                })
                .then(function(res){
                    self.response=res.data,
                    self.$store.dispatch('sessionUser')
                })
         
        },
        sendForm(){ 
            
        }
    }
}
</script>
<style lang="scss">

</style>

