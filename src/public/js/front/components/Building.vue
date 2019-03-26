<template lang="pug">
    .el-building
        .el-building__head
            .el-building__address {{el.address}}
            .el-building__date {{el.createdAt}}
        .el-building__desc {{el.desc}}
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
    border-radius: 2px;;
   
    background: white;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15),0 2px 3px rgba(0,0,0,.2);
    &:not(:last-child){
        margin-bottom: 10px;
    }
    &__head{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    &__address{
        font-size:18px;
        font-weight: 700;
    }
    &__date{
        font-size:16px;
        font-weight: 100;
    }
    &__desc{
        font-size:14px;
        p:not(:last-child){
            margin-bottom: 1px;

        }
    }
}
</style>
