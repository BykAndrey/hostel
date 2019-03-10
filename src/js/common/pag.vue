<template lang="pug">
    .pag
        a.pag__item(v-for="i of countPage",v-on:click="click(i, $event)",href="#") {{i}}
        

</template>
<script>
export default {
    name:'pag',
    props:['totalCount','sizePage'],
    computed:{
        countPage(){
            return Math.ceil(this.totalCount/this.sizePage);
        }
    },
    methods:{
        click(i,ev){
            this.$emit('changepage',i)

        }
    }
}
</script>
<style lang="scss">
    .pag{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        &__item{
            padding: 3px 5px;
            display: inline-block;
            background:white;
            border:1px solid rgba(0,0,0,0.1);
            border-radius: 3px;
            margin: 0 3px;
            color: black;
            &--active{
                background: rgba(0,0,0,0.7);
                color:white;
            }
        }
    }
</style>
