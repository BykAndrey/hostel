<template lang="pug">
	header.header
		.header__top
			.header__top-wrap.container
				.header__user
					template(v-if="activeUser===undefined")
						router-link.login-link(to="/login")  Авторизация
					template(v-else)
						router-link.login-link(to="/room")  {{activeUser.name}}
						a.login-link(@click="exitUser",href="/logout")  Выход

		.header__wrap.container
			.header__logo Logo
			.header__menu.h-menu
				
				router-link.h-menu__item(to="/") Главная
				a.h-menu__item(href="#") Куда-нибудь
				a.h-menu__item(href="#") Куда-нибудь
				a.h-menu__item(href="#") Куда-нибудь
			.header__search    
</template>
<script>
export default {
	name:'v-header',
	computed:{
		activeUser(old,n){
			return this.$store.state.user;
		}
	},
	methods:{
		exitUser(e){
			e.preventDefault();
			this.$store.commit('clearSession');
		}
	}
}
</script>
<style lang="scss">
	.header{
		background: rgba(0,0,0,0.1);
		&__top{
				background: rgba(0,0,0,0.2);
			&-wrap{
				text-align: right;
			}
		}
		&__wrap{
			display: flex;
			
		}
		&__menu{
			flex:1 0 auto;
		}
	}
	.h-menu{
		display: flex;
		align-items: center;
		
		&__item{
			flex:1 0 auto;
			font-size: 1.4em;
			padding: 1em .5em;
			display: inline-block;
			text-decoration:none;
			text-transform: uppercase;
			color:#333333;
			text-align: center;
			transition-duration: 0.3s;
			&:hover{
				background: rgba(0,0,0,0.4);
				color: white;
			}
		}
	}
	.login-link{
		font-size: 1.4em;
		padding: .2em;
		display: inline-block;
		color:#333333;
		text-decoration: none;
		&:hover{
			text-decoration: underline;
		}
	}
</style>

