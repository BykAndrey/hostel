<template lang="pug">
    .b-user 
        .b-user__title Создание пользователя
        form.b-user__body(v-on:submit="send")
            .b-user__line
            label.prop
                .prop__title Email(login):{{mail}}
                input.prop__input.c-input(type="mail", v-model="mail")
            label.prop
                .prop__title  Password:{{pass}}
                input.prop__input.c-input(type="password", v-model="pass")
            label.prop
                .prop__title  Password:{{pass2}}
                input.prop__input.c-input(type="password", v-model="pass2")
            label.prop
                .prop__title Полное имя:{{name}}
                input.prop__input.c-input(type="text", v-model="name")
            label.prop
                .prop__title Возраст:{{age}}
                input.prop__input.c-input(type="text", v-model="age")
            button.c-btn(type="submit",v-on:click="send") Создать
</template>
<script>
const axios = require("axios");
const qs = require("qs");
export default {
	name: "user",
	data() {
		return {
			mail: "",
			pass: "",
			pass2: "",
			name: "",
			age: "",
			response: ""
		};
	},
	methods: {
		send(e) {
			e.preventDefault();
			let self = this;

			if (this.pass === this.pass2) {
				let data = {
					mail: self.mail,
					name: self.name,
					password: self.pass,
					age: self.age
				};
				axios({
					method: "put",
					url: "/api/users",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: qs.stringify(data)
				}).then(function(res) {
					self.response = res.data;
				});
			}
		}
	}
};
</script>
<style lang="scss">
.b-user {
	background: white;
	max-width: 700px;
	margin: auto;
	padding: 20px 15px;

	&__title {
		text-align: center;
		margin-bottom: 20px;
		font-size: 20px;
		font-weight: 600;
	}
}
</style>

