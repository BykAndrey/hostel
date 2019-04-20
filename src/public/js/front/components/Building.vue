<template lang="pug">
    .el-building
        p {{user}}
        .el-building__head
            router-link.el-building__address(:to="'/'+el._id") {{el.address}} 
                span {{el.price}} $
            router-link(v-if="user" :to="'/'+el._id+'/edit'") Редактировать
            .el-building__date {{(new Date(el.createdAt)).getDay()}}        
</template>
<script>
export default {
    name:'building',
    props:['el'],
    computed:{
        user(){
            let us=this.$store.state.idUser;
            console.log({us})
            if(us !== undefined){
                if(this.el.user_id === us){
                    return true;

                }
            }
            return false;
        }
    }
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
        span{
            color:rgba(255,0,0,0.7)
        }
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
