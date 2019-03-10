<template lang="pug">
    .wrapper
        v_header
        router-view
</template>
<script>
import v_header from './parts/Header.vue';
export default {
    name:'app',
    components:{
        v_header
    },
    beforeMount(){
        this.$store.dispatch('sessionUser');
        console.log(1);
    }
    ,
    methods:{

    }
}
</script>
<style lang="scss">

</style>
