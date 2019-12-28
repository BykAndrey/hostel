<template lang="pug">
	.el-building
		status(v-model="el.moderated")
		.el-building__price {{el.price}}&nbsp;$
		.el-building__date {{date}}
		.el-building__photo
			swiper(:options='swiperOption', ref='mySwiper')
				swiper-slide(v-for="i in el.photo")
					.image(:style=`'background-image: url(' + i.url + ')'`)
		.el-building__head
			.prop
				router-link.el-building__title(:to="'/'+el._id") {{el.title}} 
			.prop.el-building__types 
				div {{ typeBuild }}
				div {{ typeDeal }}
			.prop
				.el-building__address(:title="fullAddress") {{ address }}
			.prop(v-if="el.metro_auto && el.metro_auto.length > 0")
				ul.el-building__metro
					li() {{el.metro_auto[0].name}}
					li(v-if="el.metro_auto.length > 1") +{{el.metro_auto.length - 1}}
		router-link.c-btn.el-building__details(v-if="el.moderated === 0" :to="'/'+el._id") Подробнее
		router-link.c-btn.el-building__edit(v-if="user" :to="'/'+el._id+'/edit'") Редактировать
</template>
<script>
import Vue from 'vue';

const status = Vue.component('status', {
	props: ['value'],
	template: `
			<div>
				<div 
					class="el-building__status el-building__status--is-not-modered"
					v-if="value === 1 || !value" 
					title="Объявление еще не прошло модерацию">
					  ?
				</div>
				<div 
					class="el-building__status el-building__status--error"
					v-if="value === 2" 
					title="Объявление не прошло модерацию">
					!
				</div>
				<div 
					class="el-building__status el-building__status--ok"
					v-if="value === 0" 
					title="Объявление прошло модерацию">
					OK
				</div>
			</div>
			`
});
export default {
	name: 'building',
	props: ['el'],
	components: {
		status
	},
	data() {
		return {
			swiperOption: {
				slidesPerView: 1,
				pagination: {
					el: '.swiper-pagination',
					type: 'progressbar'
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			}
		};
	},

	computed: {
		date() {
			let d = new Date(this.el.updatedAt);
			return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
		},
		user() {
			if (this.$store.state.userData) {
				if (this.el.user_id._id === this.$store.state.userData._id) {
					return true;
				}
			}
			return false;
		},
		typeDeal() {
			let data = {
				sale: 'Продажа',
				rent: 'Аренда'
			};
			return data[this.el.type_deal];
		},
		typeBuild() {
			let data = {
				apartament: 'Квартира',
				room: 'Комната',
				house: 'Дом'
			};
			return data[this.el.type];
		},
		address() {
			if (this.el && this.el.city_id && this.el.address) {
				return `${this.el.city_id.name}  ${this.el.address}`;
			}
			return '';
		},
		fullAddress() {
			if (this.el && this.el.country_id && this.el.city_id) {
				return `${this.el.country_id.name}  ${this.el.city_id.name}  ${this.el.address}`;
			}
			return '';
		}
	},
	created() {}
};
</script>
<style lang="scss">
.el-building {
	width: 100%;
	position: relative;
	border-radius: 2px;
	background: white;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
	transition-duration: 0.3s;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	font-size: 12px;
	&:hover {
		box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.15),
			0 2px 3px rgba(0, 0, 0, 0.2);
	}
	.prop {
		padding: 7px 15px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}
	&__photo {
		height: 150px;
		.image {
			background: center/cover no-repeat;
			width: 100%;
			height: 150px;
		}
	}
	&__status {
		position: absolute;
		font-size: 12px;
		color: white;
		padding: 5px 10px;
		line-height: 1em;
		background: #d60000;
		top: 30px;
		left: 0px;
		font-weight: 700;
		z-index: 3;
		&--is-not-modered {
			background: #ff8804;
		}
		&--error {
			background: #d60000;
		}
		&--ok {
			background: #00a017;
		}
	}
	&__details {
		margin-top: 10px;
		border-radius: 0;
	}
	&__head {
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		flex: 1 0 auto;
	}
	&__title {
		font-size: 15px;
		font-family: Arial, Helvetica, sans-serif;
		color: #333333;
		display: block;
		height: 16px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	&__price {
		top: 0;
		right: 0;
		position: absolute;
		font-size: 14px;
		color: white;
		padding: 4px 17px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 3;
		font-weight: 700;
		border-radius: 0 3px 0 0;
	}
	&__address {
		font-size: 13px;
		font-weight: 300;
		line-height: 1em;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
	}
	&__date {
		top: 0;
		left: 0;
		position: absolute;
		font-size: 14px;

		color: white;
		padding: 4px 17px;
		background: rgba(0, 0, 0, 0.5);
		z-index: 3;
		font-weight: 700;
		border-radius: 0 0 0 3px;
	}
	&__desc {
		font-size: 14px;
		p:not(:last-child) {
			margin-bottom: 1px;
		}
	}
	&__metro {
		margin-top: 10px;
		max-height: 23px;
		li {
			font-size: 12px;
			list-style: none;
			display: inline-block;
			margin: 0 3px 3px 0;
			padding: 2px 5px;
			color: white;
			background: rgb(214, 0, 0);
		}
	}
	&__edit {
		border-radius: 0;
		font-size: 12px;
		margin-top: 5px;
	}
	&__types {
		display: flex;
		padding: 0;
		&.prop {
			padding: 0;
		}
		div {
			flex: 0 0 50%;
			padding: 7px 15px;
			font-size: 14px;
			text-align: center;
			font-weight: 600;

			&:first-child {
				border-right: 1px solid rgba(0, 0, 0, 0.1);
			}
		}
	}
}
</style>
