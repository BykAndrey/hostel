<template lang="pug">
	form.p-login(action="/login",@submit="sendForm")
		.p-login__wrap.container
			h2.p-login__title Регистрация 
			label.field
				b.field__title Логин:
				.field__value 
					input.c-input(type="mail",v-model="login")
					.field__error(v-if="errors.login") {{errors.login}} 
			label.field
				b.field__title Пароль
				.field__value 
					input.c-input(type="password",v-model="password")
					.field__error(v-if="errors.password") {{errors.password}}
			label.field
				b.field__title Имя:
				.field__value 
					input.c-input(type="text",v-model="name")
					.field__error(v-if="errors.name") {{errors.name}}
			label.field
				b.field__title Телефон:
				.field__value 
					input.c-input(type="phone",v-model="phone")
					.field__error(v-if="errors.phone") {{errors.phone}}
			button.c-btn(type="submit") Зарегистрироваться
			
</template>
<script>
const axios = require("axios");
const qs = require("qs");
export default {
  name: "login",
  data() {
    return {
      errors: {},
      login: "andreybyk9606@gmail.com",
      name: "",
      phone: "",
      password: "password",
      response: "asdf"
    };
  },
  watch: {
    phone(val) {
      this.phone = val.replace(/[^\d]*/gi, "");
    }
  },
  methods: {
    checkForm() {
      this.errors = {};
      if (this.name.length < 2) {
        this.errors.name = "Заполните имя";
      }
      if (this.login.length < 2) {
        this.errors.login = "Заполните поле Логин";
      }
      if (this.password.length < 6) {
        this.errors.password = "Введите пароль(не меньше 6 символов)";
      }
      if (this.phone.length < 7) {
        this.errors.phone = "Введите телефон(не меньше 7 цифр)";
      }
    },
    sendForm(e) {
      e.preventDefault();
      let data = {
        mail: this.login,
        password: this.password,
        name: this.name,
        phone: this.phone
      };
      this.checkForm(data);
      if (Object.keys(this.errors).length > 0) {
        return false;
      }
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
    }
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

