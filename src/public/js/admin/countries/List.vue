<template lang="pug">
	.countries
		.create
			input.create(v-model="name" placeholder="Название страны")
			input.create(v-model="iso3166" placeholder="ISO 3166")
			button.c-btn(@click="create") Добавить
		.item(v-for="el in list" :key="el._id") 
			.item__name(v-if="!el.edit") {{ el.name }}
			input.item__edit(v-if="el.edit" v-model="el.name")
			.item__iso(v-if="!el.edit") {{ el.iso3166 }}
			input.item__edit(v-if="el.edit" v-model="el.iso3166")
			.item__controlls
				button.c-btn(@click="remove(el)") Удалить
				button.c-btn(v-if="!el.edit" @click="el.edit=!el.edit") Редактировать
				button.c-btn(v-if="el.edit" @click="save(el)") Сохранить
		
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      iso3166: "",
      list: []
    };
  },
  created() {
    this.reloadList();
  },
  watch: {
    iso3166(val) {
      this.iso3166 = val.substring(0, 2);
    }
  },
  methods: {
    save(el) {
      el.edit = false;
      axios({
        method: "put",
        url: this.$store.state.server + "/api/countries/" + el._id,
        data: el
      }).then(({ data }) => {
        el = { edit: false, ...data };
      });
    },
    remove(el) {
      el.edit = false;
      axios({
        method: "delete",
        url: this.$store.state.server + "/api/countries/" + el._id,
        data: el
      }).then(({ data }) => {
        this.reloadList();
      });
    },
    reloadList() {
      axios({
        url: this.$store.state.server + `/api/countries`
      }).then(({ data }) => {
        this.list = data.map(el => {
          el.edit = false;
          return el;
        });
      });
    },
    create() {
      if (this.name.length <= 3) {
        return false;
      }
      axios({
        method: "post",
        url: this.$store.state.server + "/api/countries",
        data: {
          name: this.name,
          iso3166: this.iso3166
        }
      }).then(({ data }) => {
        this.name = "";
        this.iso3166 = "";
        this.reloadList();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 10px;
}
</style>
