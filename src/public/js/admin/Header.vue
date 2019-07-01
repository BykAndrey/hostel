<template lang="pug">
	header.header
		.header__wrap
			.header__title Панель администратора
			.header__right(v-if="auth")
				a.header__go-out.c-btn(href="#" @click="logout") Выйти
</template>
<script>
export default {
	name: "v-header",
	computed: {
		auth() {
			return this.$store.state.auth;
		}
	},
	methods: {
		logout() {
			this.$store.commit("logout");
		}
	}
};
</script>
<style lang="scss">
.header {
	background: white;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	flex: 0 0 auto;

	&__title {
		padding: 10px 15px;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		flex: 0 0 300px;
	}
	&__wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__right {
		padding: 10px 15px;
		display: flex;
		align-items: center;
	}
	&__user {
	}
}
</style>
