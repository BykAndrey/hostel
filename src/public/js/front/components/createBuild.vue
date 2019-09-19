<template lang="pug">
	.create-build
		fieldset.fieldset
			legend(v-if="id") Редактирование
			legend(v-else) Новое объявление
			div.address-block
				.address-block__left
					label.field
						.field__title Название
						.field__value
							input.c-input(type="text",v-model="title")
					label.field
						.field__title Тип сделки
						.field__value
							select.c-select(v-model="type_deal")
								option(value="rent") Аренда
								option(value="sale") Продажа
					label.field
						.field__title Тип
						.field__value
							select.c-select(v-model="type")
								option(value="apartament") Квартира
								option(value="room") Комната
								option(value="house") Дом
					label.field
						.field__title Количество комнат
						.field__value
							input.c-input(type="number" v-model="countroom")
					label.field
						.field__title Страна
						.field__value
							select.c-select(v-model="country_id")
								option(v-for="item in countriesList" :key="item._id" :value="item._id") {{ item.name }}
					label.field(v-if="country_id")
						.field__title Населенный пункт
						.field__value
							select.c-select(v-model="city_id")
								option(v-for="item in cityCountry" :key="item._id" :value="item._id") {{ item.name }}
					label.field(v-if="city_id")
						.field__title Метро
						.field__value
							select.c-select(v-model="metro" multiple)
								option(v-for="item in metroList" :value="item") {{item}}
					label.field
						.field__title Полный адресс
						.field__value 
							span {{address}}
			NewMap(v-if="cord1&&cord2" :coords="[cord1,cord2]" :init_address="address" @get_address="handlerGetAddress")
			label.field
				.field__title Цена
				.field__value
					input.c-input(type="text",v-model="price")
			check(v-model="coordsFlag") Установить координаты в ручную
			fieldset.fieldset(v-if="coordsFlag")
				legend Координаты
				label.field
					.field__title Кордината 1
					.field__value 
						input.c-input(type="text",v-model="cord1")
				label.field
					.field__title Кордината 2
					.field__value 
						input.c-input(type="text",v-model="cord2")
			fieldset.fieldset
				legend Параметры
				label.field 
					.field__title Количество комнат
					.field__value 
						input.c-input(type="text" v-model="countroom") 
						| /
						input.c-input(type="text" v-model="countroomMax")
				label.field 
					.field__title Этаж
					.field__value 
						input.c-input(type="text" v-model="level") 
						| /
						input.c-input(type="text" v-model="levelMax")
				label.field 
					.field__title Площадь
					.field__value 
						input.c-input(type="text" v-model="total_area")
				label.field 
					.field__title Площадь под сдачу/продажу
					.field__value
						input.c-input(type="text" v-model="live_area")
				label.field 
					.field__title Площадь кухни
					.field__value 
						input.c-input(type="text" v-model="kitchen_area")
				label.field 
					.field__title Раздельный санузел
					.field__value 
						input.c-input(type="checkbox" v-model="restroom")
					
			label.field
				.field__title Описание
				.field__value
					textarea(v-model="desc")
			
			label.field
				.field__title Опубликовано
				.field__value
					input( type="checkbox" v-model="active")
			button.c-btn(v-if="id==undefined" v-on:click="baseCreate") Создать
			button.c-btn(v-else v-on:click="baseEdit") Редактировать
			hr
			//Map(:address = "countyName + ' ' + CityName + ' ' + address" @coords="getCoords")
			
		fieldset.fieldset(v-if="id!==undefined")
			legend Изображения
			template(v-for="(item,i) in photo")
				img(:src="item.url", width="100px" @click="removeImage(item._id)")
			input(type="file",v-on:change="fileChange")
			button.c-btn(v-on:click="addImage") Загрузить
</template>
<script>
import axios from "axios";
//import metro from "../../help/metro.json";
//import Map from "../components/map.vue";
import NewMap from "./../components/newmap.vue";
import check from "../components/check.vue";
import { Promise } from "q";
import { getSimpleAddressFromObject } from "./../../help/utils";
export default {
  props: ["value"],
  components: {
    //	Map,
    NewMap,
    check
  },
  data() {
    return {
      countriesList: [],
      allCity: [],
      cityCountry: [],
      metroList: [],
      id: undefined,
      country_id: "",
      city_id: "",
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
      metro: [],
      views: 0,
      active: false,
      file: undefined,
      coordsFlag: false,
      countroom: 0,
      countroomMax: 0,
      total_area: 0,
      live_area: 0,
      kitchen_area: 0,
      level: 0,
      levelMax: 0,
      restroom: false
    };
  },
  computed: {
    countyName() {
      let country = this.countriesList.filter(el => {
        return el._id === this.country_id;
      })[0];
      return country ? country.name : "";
    },
    CityName() {
      let country = this.cityCountry.filter(el => {
        return el._id === this.city_id;
      })[0];
      return country ? country.name : "";
    }
  },
  watch: {
    country_id() {
      this.cityCountry = this.allCity.filter(el => {
        return el.country_id === this.country_id;
      });
    },
    city_id() {
      this.setMetroList();
    },
    address() {
      this.detectMetroByAddress();
    }
  },
  async created() {
    var self = this;
    this.loadCountries();
    this.loadCity();
    if (this.value) {
      axios({
        url: self.$store.state.server + "/api/building/" + this.value,
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
          type,
          countroom,
          metro,
          active,
          views,
          _id,
          country_id,
          city_id,
          countroom,
          countroomMax,
          total_area,
          live_area,
          kitchen_area,
          level,
          levelMax,
          restroom
        } = data;
        this.country_id = country_id._id;
        this.city_id = city_id._id;
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
        this.type = type;
        this.countroom = countroom;
        this.metro = metro;
        this.active = active;
        this.views = views;
        this.photo = photo;
        this.countroom = countroom;
        this.countroomMax = countroomMax;
        this.total_area = total_area;
        this.live_area = live_area;
        this.kitchen_area = kitchen_area;
        this.level = level;
        this.levelMax = levelMax;
        this.restroom = restroom;

        this.setMetroList();
      });
    } else {
      console.log(1);
      const { geolocation } = this.$ymaps;
      const yandexLoc = geolocation.get({
        provider: "yandex",
        mapStateAutoApply: true
      });

      const browserLoc = geolocation.get({
        provider: "browser",
        mapStateAutoApply: true
      });
      Promise.all([yandexLoc, browserLoc])
        .then(values => {
          if (
            values[1] &&
            values[1].geoObjects &&
            values[1].geoObjects.position
          ) {
            const address = values[1].geoObjects.get(0);
            this.address = getSimpleAddressFromObject({
              country: address.getCountry(),
              locales: address.getLocalities(),
              street: address.getThoroughfare(),
              premise: address.getPremise(),
              premiseNumber: address.getPremiseNumber(),
              country_code: address.getCountryCode(),
              areas: address.getAdministrativeAreas()
            });
            this.cord1 = values[1].geoObjects.position[0];
            this.cord2 = values[1].geoObjects.position[1];
          } else if (
            values[0] &&
            values[0].geoObjects &&
            values[0].geoObjects.position
          ) {
            const address = values[0].geoObjects.get(0);
            this.address = getSimpleAddressFromObject({
              country: address.getCountry(),
              locales: address.getLocalities(),
              street: address.getThoroughfare(),
              premise: address.getPremise(),
              premiseNumber: address.getPremiseNumber(),
              country_code: address.getCountryCode(),
              areas: address.getAdministrativeAreas()
            });
            this.cord1 = values[0].geoObjects.position[0];
            this.cord2 = values[0].geoObjects.position[1];
          } else {
            this.cord1 = 1;
            this.cord2 = 1;
          }
        })
        .catch(e => {
          console.error(e);
          this.cord1 = 1;
          this.cord2 = 1;
        });
    }
  },

  methods: {
    async detectMetroByAddress() {
      let list = await this.$ymaps.geocode([0, 0], {
        /**
         * Опции запроса
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
         */
        // Ищем только станции метро.
        kind: "metro",
        // Запрашиваем не более 20 результатов.
        results: 20
      });
      console.log("list", list);
      list.geoObjects.toArray().forEach(element => {
        console.log(element.properties.get("name"));
      });
    },

    loadCountries() {
      axios({
        url: this.$store.state.server + `/api/countries`
      })
        .then(({ data }) => {
          this.countriesList = data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    loadCity() {
      axios({
        url: this.$store.state.server + `/api/city`
      }).then(({ data }) => {
        this.allCity = data;
        this.cityCountry = data;
      });
    },
    setMetroList() {
      let m = this.allCity.filter(el => {
        return el._id === this.city_id;
      })[0];
      this.metroList = m ? m.metro : [];
    },
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
        metro: this.metro,
        country_id: this.country_id,
        city_id: this.city_id,
        countroom: this.countroom,
        countroomMax: this.countroomMax,
        total_area: this.total_area,
        live_area: this.live_area,
        kitchen_area: this.kitchen_area,
        level: this.level,
        levelMax: this.levelMax,
        restroom: this.restroom
      };
      axios({
        url: this.$store.state.server + "/api/building/create",
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${this.$store.state.userData.token}`
        }
      }).then(({ data }) => {
        if (data._id !== undefined) {
          this.id = data._id;
          this.$router.push(`/${data._id}/edit`);
        }
      });
    },
    async baseEdit() {
      if (this.country_id == "" || this.city_id == "") {
        return false;
      }
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
        photo: this.photo,
        country_id: this.country_id,
        city_id: this.city_id,
        countroom: this.countroom,
        countroomMax: this.countroomMax,
        total_area: this.total_area,
        live_area: this.live_area,
        kitchen_area: this.kitchen_area,
        level: this.level,
        levelMax: this.levelMax,
        restroom: this.restroom
      };
      await axios({
        method: "put",
        url:
          this.$store.state.server +
          "/api/building/edit/" +
          this.$route.params.id,
        data: data,
        headers: {
          Authorization: `Bearer ${this.$store.state.userData.token}`
        }
      }).then(res => {});
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
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$store.state.userData.token}`
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
        headers: {
          Authorization: `Bearer ${this.$store.state.userData.token}`
        },
        data: {
          id: this.id,
          photo: i
        }
      }).then(({ data }) => {
        this.photo = data;
      });
    },
    handlerGetAddress(event) {
      this.cord1 = event.coords[0];
      this.cord2 = event.coords[1];
      this.address = event.address;
      this.$ymaps.geocode(this.address, {}).then(res => {
        const ad = res.geoObjects.get(0);
        console.log(this.address);
        if (ad) {
          const list = this.countriesList.filter(e => {
            console.log(e.iso3166, ad.getCountryCode());
            return e.iso3166 === ad.getCountryCode();
          });
          if (list.length) {
            this.country_id = list[0]._id;
          } else {
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
hr {
  margin: 20px 0;
}
label {
  display: flex;
  margin-bottom: 10px;
  b {
    flex: 0 0 250px;
    font-size: 14px;
    margin-right: 20px;
  }
}
textarea {
  background: white;
  color: black;
  width: 100%;
  min-height: 40px;
  padding: 10px;
}
.coordinates {
  margin: 20px 0;
}
.fieldset {
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.field {
  display: flex;
  align-items: center;
  &__title {
    font-weight: 600;
    margin-right: 20px;
  }
  &__value {
    display: flex;
    align-items: center;
    font-weight: 700;
    .c-input {
      flex: 1 0 auto;
    }
  }
}
.address-block {
  display: flex;
  justify-content: space-between;
  &__left {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 495px;
    min-width: 0;
  }
  &__right {
    flex: 0 0 550px;
    margin-left: 20px;

    min-width: 0;
    .c-btn {
      margin: 0;
    }
  }
}
</style>
