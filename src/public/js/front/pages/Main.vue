<template lang="pug">
    main.container
        h1.title THIS IS MAIN PAGE!!!
        createBuild
</template>
<script>
import createBuild from './../components/createBuild.vue';
export default {
    name:'main_page',
    components:{
        createBuild
    }
}
</script>
<style lang="scss">

</style>
