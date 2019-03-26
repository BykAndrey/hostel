<template lang="pug">
	.p-user.container
		h1.p-user__title Страница пользователя
		fieldset.p-user__data
			legend {{user.name}}
			p {{user.mail}}
			p {{user.age}}
			hr
			div {{buildigns}}
			//list-buildings()

</template>
<script>
import axios from 'axios';
import listBuildings from "./../components/listBuildings.vue";
export default {
	name:'userPage',
	components:{
		listBuildings
	},
	data(){
		return {
			buildigns:[]
		}
	},
	
	created(){
		const self=this;
       
	},
	computed:{
		user(){
			var user=this.$store.state.user
			return this.$store.state.user;
		}
	}
}
</script>
<style lang="scss">
	fieldset{
		padding:20px;
	}
	legend{
		font-size:16px;
		font-weight:700;
		
	}
</style>
