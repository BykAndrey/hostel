<template lang="pug">
    .countries
        .create
          input.create(v-model="name" placeholder="Название страны")
          button.c-btn(@click="create") Добавить
        .item(v-for="el in list" :key="el._id") 
            .item__name(v-if="!el.edit") {{ el.name }}
            input.item__edit(v-if="el.edit" v-model="el.name")
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
      list: []
    };
  },
  created() {
    this.reloadList();
  },
  methods: {
    save(el) {
      el.edit = false;
      axios({
        method: "put",
        url: "api/countries/" + el._id,
        data: el
      }).then(({ data }) => {
        el = { edit: false, ...data };
      });
    },
    remove(el) {
      el.edit = false;
      axios({
        method: "delete",
        url: "api/countries/" + el._id,
        data: el
      }).then(({ data }) => {
        this.reloadList();
      });
    },
    reloadList() {
      axios({
        url: `api/countries`
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
        url: "api/countries",
        data: {
          name: this.name
        }
      }).then(({ data }) => {
        this.name = "";
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
