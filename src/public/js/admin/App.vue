<template lang="pug">
	.wrapper
		Header
		main.main(v-if="auth")
			sidebar
			.main__content
				router-view
		main.main(v-if="!auth")
			.login
				label.field
					.field__title Login
					.field__value 
						input(type="text" v-model="login")
				label.field
					.field__title Password
					.field__value 
						input(type="password" v-model="pass")
				button.c-btn(@click="save") Войти
</template>
<script>
import Header from "./Header.vue";
import sidebar from "./Sidebar.vue";

import listtable from "./tableList.vue";
export default {
	name: "app",
	data() {
		return {
			login: "",
			pass: ""
		};
	},
	components: {
		Header,
		sidebar,
		listtable
	},
	computed: {
		auth() {
			return this.$store.state.auth;
		}
	},
	methods: {
		save() {
			if (this.pass === "password" && this.login === "admin") {
				this.$store.commit("login");
			}
		}
	}
};
</script>
<style lang="scss">
.main {
	position: relative;
	min-height: 300px;
	display: flex;
	flex: 1 1 auto;
	&__content {
		flex: 1 1 auto;
	}
}
.login {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.field {
	display: flex;
	margin-bottom: 10px;
	&__title {
		flex: 0 1 130px;
		margin-right: 20px;
	}
}
</style>
