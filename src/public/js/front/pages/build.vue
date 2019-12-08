<template lang="pug">
	.building.container
		.building__left
			.building__title {{item.title}} 
			.address(v-if="item.country_id&&item.city_id") {{item.country_id.name}}, {{item.city_id.name}}, {{item.address}}
			.metro 
				.item(v-for="met in item.metro_auto") {{met.name}} ({{met.length}} км.)	
			.features
				.item
					.item__title Цена
					.item__value {{item.price}} $
				.item
					.item__value {{type}}
				.item
					.item__value {{type_deal}}
			.building__slider 
				swiper(:options='swiperOption', ref='mySwiper')
					// slides
					swiper-slide(v-for="i in item.photo")
						img(:src="i.url")
					.swiper-pagination(slot='pagination')
					.swiper-button-prev(slot='button-prev')
					.swiper-button-next(slot='button-next')
					.swiper-scrollbar(slot='scrollbar')
			.features
				.item
					.item__title Этаж
					.item__value {{item.level}} / {{item.levelMax}}
				.item
					.item__title Комнаты
					.item__value {{item.countroom}} / {{item.countroomMax}}
				.item
					.item__title Площадь 
					.item__value {{item.live_area}} / {{item.total_area}}
				.item
					.item__title Площадь кухни
					.item__value {{item.kitchen_area}}
				.item
					.item__title Раздельный санузел
					.item__value {{item.restroom ===true?"Да":"Нет"}}
			
			.building__desciption {{item.desc}}
			.user(v-if="item.user_id")
				.user__left
					.user__title Контакты
					.user__name {{item.user_id.name}} 
				.user__right
					a(:href="'mailto:'+item.user_id.mail") {{item.user_id.mail}}
					a.user__phone(:href="'tel:'+item.user_id.phone") {{item.user_id.phone}}
		.building__right
			.building__title На карте
			//Map(:builds='[item]')
			#map
</template>
<script>
import axios from "axios";
import Map from "../components/map.vue";
export default {
	components: {
		Map
	},
	beforeMount() {
		this.id = this.$route.params.id;
		axios({
			method: "get",
			url: this.$store.state.server + "/api/building/" + this.id
		}).then(({ data }) => {
			this.item = data;
			this.createMap();
		});
	},
	mounted() {},
	data() {
		return {
			swiperOption: {
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar"
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev"
				}
			},
			id: "-1",
			item: {},
			map: null
		};
	},
	computed: {
		type() {
			let type = "";
			switch (this.item.type_deal) {
				case "sale":
					type = "Продажа";
					break;
				case "rent":
					type = "Аренда";
					break;
			}
			return type;
		},
		type_deal() {
			let type = this.item.type;

			switch (this.item.type) {
				case "apartament":
					type = "Квартира";
					break;
				case "room":
					type = "Комната";
					break;
				case "house":
					type = "Дом";
					break;
			}
			return type;
		}
	},
	methods: {
		createMap() {
			this.map = new this.$ymaps.Map("map", {
				center: this.item.chords,
				zoom: 16
			});
			const point = new this.$ymaps.Placemark(this.item.chords);
			this.map.geoObjects.add(point);
		}
	}
};
</script>
<style lang="scss" scoped>
@import "./../../../css/config.scss";
.building {
	padding: 22px;
	display: flex;
	&__left {
		flex: 0 1 600px;
		min-width: 0;
		margin-right: 30px;
	}
	&__right {
		flex: 0 0 500px;
		min-width: 0;
		#map {
			height: 500px;
		}
	}
	&__title {
		font-size: 22px;
		font-weight: 800;
		margin-bottom: 20px;
	}
	&__desciption {
		font-size: 14px;
		line-height: 1.4em;
		margin-top: 20px;
	}
	&__slider {
		img {
			display: block;
			max-width: 100%;
			max-height: 60vh;
			margin: auto;
		}
	}
}
.features {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.item {
		text-align: center;
		flex: 1 0 25%;
		padding: 10px 5px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&__title {
			font-size: 14px;
		}
		&__value {
			font-size: 16px;
			font-weight: 700;
		}
	}
}
.address {
	font-size: 14px;
	margin: 10px 0;
}
.metro {
	margin: 10px 0;
	.item {
		display: inline-block;
		padding: 1px 5px;
		background: #d60000;
		color: white;
		font-size: 12px;
		margin-right: 5px;
	}
}
.user {
	font-size: 16px;
	margin: 20px 0;
	display: flex;
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 10px;
	&__title {
		font-size: 18px;
		font-weight: 700;
	}
	&__name {
		margin-right: 20px;
		a {
			display: block;
		}
	}
	a {
		display: block;
		color: black;
		font-weight: 700;
		&:hover {
			color: $color;
		}
	}
}
</style>
