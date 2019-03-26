<template lang="pug">
    .p-catalog.container
        h1.p-catalog__title Каталог
        //list-buildings
        .p-catalog__items
            listBuildings
            template(v-for="item in items")
                building(:el="item")
            
</template>
<script>
import axios from 'axios';
import building from '../components/Building.vue';
import listBuildings from '../components/listBuildings.vue';
export default {
    name:'catalog',
    components:{
        building,
        listBuildings
    },
    data(){
        return{
            items:[]
        }
    } ,
    created(){
   
        const self=this;
             console.log("="+this.$store.state.server);


        axios({
            url:self.$store.state.server+'/api/building',
        }).then(function(data){

            self.items=data.data.data;
            console.log(self.items);
        }).catch(function(e){
            console.error(e);
        })
    }
}
</script>
<style lang="scss">

</style>
