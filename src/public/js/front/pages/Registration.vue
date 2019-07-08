<template lang="pug">
	form.p-login(action="/login",@submit="checkForm")
		.p-login__wrap.container
			h2.p-login__title Регистрация 
			label
				b Логин:
				input.c-input(type="mail",v-model="login")
			label
				b Пароль
				input.c-input(type="password",v-model="password")
			label
				b Имя:
				input.c-input(type="text",v-model="name")
			label
				b phone:
				input.c-input(type="phone",v-model="phone")
			p.error(v-if="errors") Пользователь с такой почтой уже есть
			button.c-btn(type="submit") Зарегистрироваться
			
</template>
<script>
const axios = require("axios");
const qs = require("qs");
export default {
	name: "login",
	data() {
		return {
			errors: null,
			login: "andreybyk9606@gmail.com",
			name: "",
			phone: "",
			password: "password",
			response: "asdf"
		};
	},
	methods: {
		checkForm(e) {
			e.preventDefault();
			this.errors = null;
			var data = {
				mail: this.login,
				password: this.password,
				name: this.name,
				phone: this.phone
			};
			axios({
				method: "post",
				url: this.$store.state.server + "/api/users",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: qs.stringify(data)
			})
				.then(res => {
					if (res.data.errors) {
						this.errors = res.data.errors;
					} else {
						this.response = res.data;
						this.$store.dispatch("sessionUser");
						this.$router.push("/account");
					}
				})
				.catch(er => {
					console.error("Error");
				});
		},
		sendForm() {}
	}
};
</script>
<style lang="scss">
.c-btn {
	margin-top: 20px;
}
.error {
	margin: 10px 0;
	font-size: 14px;
	color: red;
}
</style>

