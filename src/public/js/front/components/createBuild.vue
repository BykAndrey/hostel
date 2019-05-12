<template lang="pug">
	.create-build
		fieldset
			legend Базавые данные {{id}}
			label
				b Название
				input(type="text",v-model="title")
			label
				b Тип сделки
				select(v-model="type_deal")
					option(value="rent") Стам
					option(value="sale") Продам
			label
				b Тип
				select(v-model="type")
					option(value="apartament") Квартира
					option(value="room") Комната
			label
				b Количество комнат
				input(type="number" v-model="countroom")
			label
				b Улица
				input(type="text",v-model="address")
			label
				b price
				input(type="text",v-model="price")
				
			label
				b Кордината 1
				input(type="text",v-model="cord1")
			label
				b Кордината 2
				input(type="text",v-model="cord2")
			label
				b Описание
				textarea(v-model="desc")
			label
				b Метро
				b 1{{metro}}2
				select(v-model="metro" multiple)
					option(value="no") Метро нет
					option(v-for="item in metroList" :value="item.name") {{item.name}}
			label
				b active
				input( type="checkbox" v-model="active")
			button(v-if="id==undefined" v-on:click="baseCreate") Создать
			button(v-else v-on:click="baseEdit") Редактировать
		fieldset(v-if="id!==undefined")
			legend Изображения
			template(v-for="(item,i) in photo")

				img(:src="item.url", width="100px" @click="removeImage(item._id)")
			input(type="file",v-on:change="fileChange")
			button(v-on:click="addImage") Загрузить
</template>
<script>
import axios from "axios";
import metro from "../../help/metro.json";
console.log(metro);
export default {
  props: ["id"],
  data() {
    return {
      metroList: metro,
      id: -1,
      created: false,
      title: "",
      address: "",
      cord1: 0,
      cord2: 0,
      price: 0,
      desc: "",
      photo: [],
      type_deal: "sale",
      type: "apartament",
      countroom: 0,
      metro: "no",
      views: 0,
      file: undefined
    };
  },
  created() {
    var self = this;
    if (this.id != undefined) {
      axios({
        url: self.$store.state.server + "/api/building/" + this.id,
        method: "get"
      }).then(({ data }) => {
        var {
          address,
          chords,
          desc,
          photo,
          price,
          address,
          title,
          type_deal,
          countroom,
          metro,
          active,
          views,
          _id
        } = data;
        this.id = _id;
        this.address = address;
        this.desc = desc;
        this.price = price;
        if (chords != undefined) {
          this.cord1 = chords[0];
          this.cord2 = chords[1];
        }
        this.title = title;
        this.type_deal = type_deal;
        this.countroom = countroom;
        console.log(metro);
        this.metro = metro;
        this.active = active;
        this.views = views;
        this.photo = photo;
      });
    }
  },

  methods: {
    fileChange(e) {
      this.file = e.target.files || e.dataTransfer.files;
    },
    baseCreate() {
      let self = this;
      let data = {
        title: this.title,
        address: this.address,
        desc: this.desc,
        cord1: this.cord1,
        cord2: this.cord2,
        price: parseInt(this.price),
        countroom: this.countroom,
        type_deal: this.type_deal,
        type: this.type,
        metro: this.metro
      };
      console.log(data);
      axios({
        url: this.$store.state.server + "/api/building/create",
        method: "post",
        data: data
      }).then(({ data }) => {
        if (data.id !== undefined) {
          this.id = data._id;
        }
      });
    },
    async baseEdit() {
      let data = {
        _id: this.id,
        title: this.title,
        address: this.address,
        desc: this.desc,
        cord1: this.cord1,
        cord2: this.cord2,
        price: parseInt(this.price),
        countroom: this.countroom,
        type_deal: this.type_deal,
        type: this.type,
        metro: this.metro,
        views: this.views,
        active: this.active,
        photo: this.photo
      };
      await axios({
        method: "post",
        url: "/api/building/edit/" + this.$route.params.id,
        data: data
      }).then(res => {
        console.log(data);
      });
    },
    addImage() {
      let self = this;
      let formData = new FormData();
      formData.append("image", this.file[0]);
      formData.append("id", this.id);

      axios
        .post(
          self.$store.state.server + "/api/building/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function({ data }) {
          self.photo.push(data);
        });
    },
    removeImage(i) {
      axios({
        method: "post",
        url: `${this.$store.state.server}/api/building/remove-image`,
        data: {
          id: this.id,
          photo: i
        }
      }).then(({ data }) => {
        this.photo = data;
      });
    }
  }
};
</script>
<style lang="scss" >
label {
  display: flex;
  margin-bottom: 10px;
  b {
    flex: 0 0 250px;
    font-size: 14px;
    margin-right: 20px;
  }
}
input,
textarea {
  background: white;
  color: black;
  width: 100%;
  min-height: 40px;
  padding: 10px;
}
</style>
