<template lang="pug">
    .utable
        .utable__title Пользователи
        .utable__settings
            router-link(to="/users/add") Add
        .utable__head
            .utable__th ФИО
            .utable__th Права
            .utable__th Дата последнего входа
            .utable__th Инфо
        .utable__body
            .utable__tr(v-for="item of items")
                .utable__td 
                    p {{item.name}}
                    p {{item.mail}}
                .utable__td {{item.role}}
                .utable__td {{item.last_log}}
                .utable__td 
                    a.c-btn(href="#") Инфо
        pag(total-count="50",size-page="5",v-on:changepage="pageChange")
</template>
<script>
import Pag from '../common/pag.vue';
const axios = require('axios');
export default {
    name:'tableList',
    data(){
        return{
            items:[
              /*  {
                    name:"Андрей Сергеевич Бык",
                    role:'Администратор',
                    last_log:"20/12/2019",
                },
                {
                    name:"Гадя Петрович Хренова",
                    role:'Пользователь',
                    last_log:"22/5/2019",
                },
                {
                    name:"Геннадий Иванович Сидочук ",
                    role:'Пользователь',
                    last_log:"1/11/2019",
                }*/
            ]
        }
    },
    components:{
        Pag
    },
    methods:{
        pageChange(page){
            console.log("Current Page:"+page);
            var self=this;
            axios.get("/api/users")
                .then(function(res){
                    self.items=res.data;

                })
        }
    }
}
</script>
<style lang="scss">
    .utable{
        
        background: white;
        &__settings{
            padding: 10px 15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
        }
        &__title{
            background: white;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 2px solid rgba(0,0,0,0.1);
        }
        &__head{
            display: flex;
            justify-content: space-between;
        }
        &__tr{
            display: flex;
            justify-content: space-between;
        }
        &__td,&__th{
            flex:1 1 auto;
            background: white;
            padding: 10px 15px;
            border-bottom:1px solid rgba(0,0,0,0.1);
            &:not(:last-child){
               border-right:1px solid rgba(0,0,0,0.1); 
            }
            &:nth-child(1){
                flex:0 0 40%;
            }
             &:nth-child(2){
                flex:0 0 20%;
            }
             &:nth-child(3){
                flex:0 0 25%;
            }
             &:nth-child(4){
                flex:0 0 15%;
            }
             &:nth-child(5){
                
            }
        }
    }
</style>
