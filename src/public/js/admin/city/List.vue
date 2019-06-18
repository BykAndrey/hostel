<template lang="pug">
    .city
        .create(v-if="countries.length > 0")
          select(v-model="editEl.country_id" placeholder="Страна")
            option(v-for="item in countries" :key="item.id" :value="item._id") {{ item.name }}
          input.create(v-model="editEl.name" placeholder="Название города")
          .create__type
            label
              input(type="radio" name="level" value="100" v-model="editEl.level")
              span Крупный город
            label
              input(type="radio" name="level" value="200" v-model="editEl.level")
              span Средний город
            label
              input(type="radio" name="level" value="300" v-model="editEl.level")
              span Маленький город 
            label
              input(type="radio" name="level" value="400" v-model="editEl.level")
              span гордской поселок/деревня/село/хутор
          .create__metro
            span.item(v-for="el in editEl.metro") {{ el }}
          .create__addmetro 
            input(v-model="newmetro")
            button.c-btn(@click="addMetro") Добавить Станцию
          button.c-btn(v-if="!editEl._id" @click="create") Создать
          button.c-btn(v-if="editEl._id" @click="update") Применить изменения
        .item-row(v-for="el in list" :key="el._id") 
            .item-row__name(v-if="!el.edit") {{ el.name }}
            .item-row__level {{ el.level }}
            .item-row__controlls
                button.c-btn(@click="remove(el)") Удалить
                button.c-btn(@click="setForEdit(el)") Редактировать
        
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      editEl: {
        _id: null,
        country_id: "",
        name: "",
        level: 200,
        metro: []
      },
      newmetro: "",
      list: [],
      countries: []
    };
  },
  created() {
    this.reloadList();
    this.loadCountries();
  },
  methods: {
    remove(el) {
      el.edit = false;
      axios({
        method: "delete",
        url: "api/city/" + el._id,
        data: el
      }).then(({ data }) => {
        this.reloadList();
      });
    },
    loadCountries() {
      axios({
        url: `api/countries`
      }).then(({ data }) => {
        this.countries = data.map(el => {
          return el;
        });
        this.editEl.country_id = this.countries[0]._id;
      });
    },
    reloadList() {
      axios({
        url: `api/city`
      }).then(({ data }) => {
        this.list = data.map(el => {
          return el;
        });
      });
    },
    create() {
      if (this.editEl.name.length <= 3 || this.editEl.country_id.length < 5) {
        return false;
      }
      let data = { ...this.editEl };
      data.metro = JSON.stringify(data.metro);
      axios({
        method: "post",
        url: "api/city",
        data: data
      }).then(({ data }) => {
        this.editEl._id = null;
        this.editEl.name = "";
        this.editEl.metro = [];
        this.reloadList();
      });
    },
    setForEdit(el) {
      this.editEl = el;
    },
    addMetro() {
      if (this.newmetro.length > 3) {
        this.editEl.metro.push(this.newmetro);
        this.newmetro = "";
      }
    },
    update() {
      if (this.editEl.name.length <= 3 || this.editEl.country_id.length < 5) {
        return false;
      }
      let data = { ...this.editEl };
      data.metro = JSON.stringify(data.metro);
      axios({
        method: "put",
        url: "api/city/" + this.editEl._id,
        data: data
      }).then(({ data }) => {
        this.name = "";
        this.reloadList();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.item-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  padding: 10px;
}
.create {
  &__metro {
    .item {
      display: inline-block;
      padding: 5px;
      background: white;
    }
  }
  &__type {
    label {
      display: block;
    }
  }
}
</style>
