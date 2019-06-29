<template lang="pug">
	header.header
		.header__top
			.header__top-wrap.container
				.header__user
					template(v-if="!user")
						router-link.login-link(to="/login")  Авторизация
						router-link.login-link(to="/registration")  Регистрация
					template(v-else)
						router-link.login-link(to="/account")  {{user.name}}
						a.login-link(@click="exitUser",href="/logout")  Выход
		.header__bottom
			.header__bottom-wrap.container
				.header__logo
					img(src="/public/img/logo.svg")
				.header__menu.h-menu
					router-link.h-menu__item(to="/") Главная
					router-link.h-menu__item(to="/catalog") Каталог
					a.h-menu__item(href="#") Куда-нибудь
					a.h-menu__item(href="#") Куда-нибудь
				.header__search    
</template>
<script>
const axios = require("axios");
import img from "./../../../img/logo.svg";
import { mapState } from "vuex";
export default {
  name: "v-header",
  computed: {
    activeUser(old, n) {
      return this.$store.state.user;
    },
    ...mapState({
      user: state => state.userData
    })
  },
  methods: {
    exitUser(e) {
      var self = this;
      e.preventDefault();
      axios
        .get(this.$store.state.server + "/api/logout", {})
        .then(function() {
          self.$store.commit("clearSession");
          self.$store.dispatch("sessionUser");
          self.$store.commit("removeUserData");
        })
        .catch(function(er) {
          console.log(er);
        });
    }
  }
};
</script>
<style lang="scss">
@import "./../../../css/config.scss";
.header {
  &__logo {
    padding: 3px 0;
  }
  &__top {
    background: rgba(7, 71, 166, 8);
    &-wrap {
      text-align: right;
    }
  }
  &__bottom {
    background: $color2;
    &-wrap {
      display: flex;
    }
  }
  &__menu {
    flex: 1 0 auto;
  }
}
.h-menu {
  display: flex;
  align-items: center;

  &__item {
    flex: 1 0 auto;
    font-size: 1.4em;
    padding: 1em 0.5em;
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    color: #333333;
    text-align: center;
    transition-duration: 0.3s;
    color: white;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
      color: white;
    }
  }
}
.login-link {
  font-size: 1.4em;
  padding: 0.2em;
  display: inline-block;
  color: #333333;
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
}
</style>

