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
						.field__title Страна
						.field__value
							select.c-select(v-model="country_id")
								option(v-for="item in countriesList" :key="item._id" :value="item._id") {{ item.name }}
					label.field(v-if="country_id")
						.field__title Населенный пункт
						.field__value
							select.c-select(v-model="city_id")
								option(v-for="item in cityCountry" :key="item._id" :value="item._id") {{ item.name }}
					.field(v-if="metro_auto.length")
						.field__title Ближайшие станции метро
						.field__value
							div 
								.metro-item(v-for="item in metro_auto") {{item.name}} ({{item.length}}) km.
					label.field
						.field__title Полный адресс
						.field__value 
							span {{address}}
			NewMap(v-if="cord1&&cord2" :coords="[cord1,cord2]" :init_address="address" @get_address="handlerGetAddress")
			label.field
				.field__title Цена (USD)
				.field__value
					input.c-input(type="text",:value="price | numberFilter" @change="e=>price=e.target.value")
			fieldset.fieldset
				legend Параметры
				label.field 
					.field__title Количество комнат
					.field__value 
						input.c-input(type="text" v-model="countroom" @change="e=> this.countroom = minMaxValue(this.countroom, 1, this.countroomMax)") 
						| /
						input.c-input(type="text" v-model="countroomMax" @change="e=> this.countroomMax = numberValue(this.countroomMax, 1)")
				label.field 
					.field__title Этаж
					.field__value 
						input.c-input(type="text" v-model="level" @change="e=> this.level = minMaxValue(this.level, 1, this.levelMax)") 
						| /
						input.c-input(type="text" v-model="levelMax" @change="e=> this.levelMax = numberValue(this.levelMax,1)")
				label.field 
					.field__title Площадь(м.кв.)
					.field__value 
						input.c-input(type="text" :value="total_area | numberFilter" @change="e=>total_area=e.target.value")
				label.field 
					.field__title Площадь под сдачу/продажу (м.кв.)
					.field__value
						input.c-input(type="text" :value="live_area | numberFilter" @change="e=>live_area=e.target.value")
				label.field 
					.field__title Площадь кухни (м.кв.)
					.field__value 
						input.c-input(type="text" :value="kitchen_area | numberFilter" @change="e=>kitchen_area=e.target.value")
				label.field 
					.field__title Раздельный санузел
					.field__value 
						div
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
import { parse } from "babylon";
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
			countroom: 1,
			views: 0,
			active: false,
			file: undefined,
			countroom: 1,
			countroomMax: 1,
			total_area: 1,
			live_area: 1,
			kitchen_area: 1,
			level: 1,
			levelMax: 1,
			restroom: false,
			metro_auto: []
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
					restroom,
					metro_auto
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
				this.metro_auto = metro_auto;
			});
		} else {
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
	filters: {
		numberFilter: function(value) {
			let v = value.toString().replace(/[^\d.,]/gi, "");
			v = v === "" ? 0 : parseInt(v);
			return v;
		}
	},
	methods: {
		async detectMetroByAddress() {
			const addressCoords = [this.cord1, this.cord2];
			let list = await this.$ymaps.geocode(addressCoords, {
				kind: "metro"
			});
			this.metro_auto = [];
			list.geoObjects.toArray().forEach(element => {
				const Metro = element;

				this.$ymaps
					.route([addressCoords, Metro.geometry.getCoordinates()])
					.then(route => {
						if (route.getLength() < 2000) {
							this.metro_auto.push({
								name: Metro.properties.get("name"),
								length: (route.getLength() / 1000).toFixed(1)
							});
						}
					});
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
				country_id: this.country_id,
				city_id: this.city_id,
				countroom: this.countroom,
				countroomMax: this.countroomMax,
				total_area: this.total_area,
				live_area: this.live_area,
				kitchen_area: this.kitchen_area,
				level: this.level,
				levelMax: this.levelMax,
				restroom: this.restroom,
				metro_auto: this.metro_auto,
				active: this.active
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
				restroom: this.restroom,
				metro_auto: this.metro_auto
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
			if (
				event.coords[0] !== this.cord1 ||
				event.coords[1] !== this.cord2
			) {
				this.cord1 = event.coords[0];
				this.cord2 = event.coords[1];
				this.detectMetroByAddress();
			}

			this.address = event.address;
			this.$ymaps.geocode(this.address, {}).then(res => {
				const ad = res.geoObjects.get(0);

				if (ad) {
					const list = this.countriesList.filter(e => {
						return e.iso3166 === ad.getCountryCode();
					});
					if (list.length) {
						this.country_id = list[0]._id;
					} else {
					}
				}
			});
		},
		minMaxValue(value, min, max) {
			const rightValue = this.numberValue(value, min);
			if (min && rightValue < this.numberValue(min)) {
				return this.numberValue(min);
			}
			if (max && rightValue > this.numberValue(max)) {
				return this.numberValue(max);
			}
			return rightValue;
		},
		numberValue(value, defaultValue) {
			if (value && value !== " " && value !== "") {
				const numbersValue = value.toString().replace(/[^\d]/gi, "");
				if (numbersValue != "") {
					const count = parseInt(numbersValue);
					return count ? count : 1;
				}
				return 1;
			} else {
				return defaultValue ? defaultValue : 1;
			}
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
}
.create-build {
	.field {
		width: 100%;
	}
}
.metro-item {
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	font-size: 14px;
	padding: 5px 10px;
	display: inline-block;
	margin-right: 10px;
	margin-bottom: 10px;
	background: white;
}
</style>
