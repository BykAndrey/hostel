<template lang="pug">
	.p-user.container
		h1.p-user__title Страница пользователя
		fieldset.p-user__data
			legend {{user.name}}
			.field
				.field__title ФИО
				.field__value 
					input.c-input(v-model="inf.name" type="text")
					.field__error(v-if="errors.name") {{errors.name}}

			.field
				.field__title Телефон
				.field__value 
					input.c-input(v-model="inf.phone" type="text")
					.field__error(v-if="errors.phone") {{errors.phone}}
			button.c-btn(@click="save" type='submit') Сохранить
			hr
			button.c-btn.p-user__add(v-if="!add" @click="add = true") Добавить объявление
			button.c-btn.p-user__add(v-if="add" @click="add = false") Закрыть добавление
			createBuild(v-if="add")
			hr
			list-buildings(:list="list")

</template>
<script>
import axios from "axios";
import listBuildings from "./../components/listBuildings.vue";
import createBuild from "./../components/createBuild.vue";
export default {
  name: "userPage",
  components: {
    listBuildings,
    createBuild
  },
  data() {
    return {
      buildigns: [],
      list: [],
      add: false,
      errors: {},
      inf: {
        name: "",
        phone: ""
      }
    };
  },

  created() {
    this.$store.dispatch("GET_COOKIE").then(() => {
      this.$store.dispatch("CHECK_USER").then(() => {
        this.$store.dispatch("GET_PROFILE");
      });
    });
    axios({
      method: "get",
      url: this.$store.state.server + "/api/building/user",
      headers: {
        Authorization: `Bearer ${this.$store.state.userData.token}`
      }
    }).then(({ data }) => {
      this.list = data.data;
    });
  },
  computed: {
    user() {
      var user = this.$store.state.user;
      return this.$store.state.userData;
    }
  },
  watch: {
    user() {
      this.inf = this.user;
    }
  },
  methods: {
    save() {
      this.errors = {};
      if (this.inf.name.length === 0) {
        this.errors.name = "Заполните имя";
      }
      if (this.inf.phone.length === 0) {
        this.errors.phone = "Заполните телефон";
      }
      if (Object.key(this.errors).length) {
        return false;
      }
      axios({
        method: "put",
        url: this.$store.state.server + "/api/users",
        headers: {
          Authorization: `Bearer ${this.$store.state.userData.token}`
        },
        data: this.inf
      });
    }
  }
};
</script>
<style lang="scss">
.p-user__add {
  margin: 25px 0;
}
fieldset {
  padding: 20px;
}
legend {
  font-size: 16px;
  font-weight: 700;
}

hr {
  margin: 20px 0;
}
</style>
