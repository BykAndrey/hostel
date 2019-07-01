<template lang="pug">
	form.p-login(action="/login",@submit="checkForm")
		.p-login__wrap.container
			h2.p-login__title Авторизация
			label.field
				.field__title Login:
				.field__value
					input.c-input(type="mail",v-model="login")
			label.field
				.field__title Password
				.field__value
					input.c-input(type="password",v-model="password")
			button.c-btn(type="submit") Войти
</template>
<script>
const axios = require("axios");
const qs = require("qs");
export default {
	name: "login",
	data() {
		return {
			errors: [],
			login: "andreybyk9606@gmail.com",
			password: "password",
			response: "asdf"
		};
	},
	methods: {
		checkForm(e) {
			e.preventDefault();

			var self = this;
			//self.$store.dispatch('sessionUser')
			var data = {
				mail: self.login,
				password: self.password
			};
			/*axios.post('http://localhost:3000/api/login',
            {
                bod
            })*/

			axios({
				method: "post",
				url: "http://localhost:3000/api/login",
				headers: {
					"Content-type": "application/json"
				},
				data: JSON.stringify(data)
			}).then(res => {
				(self.response = res.data), self.$store.dispatch("sessionUser");
				self.$store.commit("setUserData", res.data);
				self.$store.commit("setUserDataCookie", res.data);
				this.$router.push("account");
			});
		},
		sendForm() {}
	}
};
</script>
<style lang="scss">
</style>

