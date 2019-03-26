<template lang="pug">
        div()
            b countItems:{{countItems}}
            building(v-for="item in list" :el="item")
            pag(v-bind:total_count="countItems", size="1", v-on:changepage="loadPage")
</template>
<script>
import axios from 'axios';
import building from './Building.vue';
import pag from "./../../common/pag.vue"
export default {
    name:'listbuild',
    data(){
        return {
            list:[],
            countItems:5,
        }
    },
    components:{
        building,
        pag
    },
    created(){
         var self=this;
         console.log(this);
         console.log(self);
         axios({
             method:'get',
            url:self.$store.state.server+'/api/building',
           headers: {
                        "Content-type": "application/json"
                    },
            params:{
                size:1,
                page:1,
            }
        }).then(function(data){

             self.list=data.data.data;
            self.countItems=data.data.count;
            console.log("self.countItems:"+self.countItems)
        }).catch(function(e){

            console.error(e);
        })
    },
   
    methods:{
        loadPage(e,page){

        }
    }
}
</script>
