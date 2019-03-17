<template lang="pug">
	.p-user.container
		h1.p-user__title Страница пользователя
		fieldset.p-user__data
			legend {{user.name}}
			p {{user.mail}}
			p {{user.age}}

</template>
<script>
export default {
	name:'userPage',
	computed:{
		user(){
			var user=this.$store.state.user
			return this.$store.state.user;
		}
	}
}
</script>
<style lang="scss">

</style>
