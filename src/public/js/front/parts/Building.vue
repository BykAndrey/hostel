<template lang="pug">
    fieldset.el-building
        legend.el-building__address {{el.address}}
        p.el-building__created {{el.createdAt}}
        p.el-building__desc {{el.desc}}
</template>
<script>
export default {
    name:'building',
    props:['el']
}
</script>
<style lang="scss">
.el-building{
    padding: 10px;
}
</style>
