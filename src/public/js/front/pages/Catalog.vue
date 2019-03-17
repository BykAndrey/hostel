<template lang="pug">
    .p-catalog
        .p-catalog__title Каталог
        .p-catalog__items
            template(v-for="item in items")
                building(:el="item")
</template>
<script>
import axios from 'axios';
import building from '../parts/Building.vue';
export default {
    name:'catalog',
    components:{
        building
    },
    data(){
        return{
            items:[]
        }
    } ,
    created(){
        const self=this;
        axios({
            url:'/api/building',
        }).then(function(data){

            self.items=data.data;
        }).catch(function(){

        })
    }
}
</script>
<style lang="scss">

</style>
