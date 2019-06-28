<template lang="pug">
    form.p-login(action="/login",@submit="checkForm")
        .p-login__wrap.container
            h2.p-login__title Регистрация 
            p {{errors}}
            p {{response}} 
            div andreybyk9606@gmail.com
            label
                b Login:
                input.c-input(type="mail",v-model="login")
            label
                b Пароль
                input.c-input(type="password",v-model="password")
            label
                b Имя:
                input.c-input(type="text",v-model="name")
            label
                b Возраст:
                input.c-input(type="number",v-model="age")
            button.c-btn(type="submit") Создать пользователя
            
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
			name: "",
			age: "",
			password: "password",
			response: "asdf"
		};
	},
	methods: {
		checkForm(e) {
			e.preventDefault();

			var self = this;

			var data = {
				mail: self.login,
				password: self.password,
				name: self.name,
				age: self.age
			};
			axios({
				method: "post",
				url: this.$store.state.server + "/api/users",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: qs.stringify(data)
			}).then(function(res) {
				(self.response = res.data), self.$store.dispatch("sessionUser");
			});
		},
		sendForm() {}
	}
};
</script>
<style lang="scss">
</style>

