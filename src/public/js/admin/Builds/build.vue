<template>
	<div :class="'build '+statusClass">
		<template v-if="value">
			<div class="build__photo">
				<img v-if="value.photo[0]" :src="value.photo[0].url" :alt="value.photo[0].desc" width="200" />
			</div>
			<div class="build__text">
				<b
					class="build__date"
				>Обновлено: {{value.updatedAt | dateFormat}} Создано: {{value.createdAt | dateFormat}}</b>
				<div class="build__top">
					<div class="build__prop build__prop--type-deal">{{type_deal}}</div>
					<div class="build__prop build__prop--type">{{type}}</div>
					<div :class="'build__prop build__prop--status '+ statusClass">{{statusText}}</div>
				</div>
				<div class="build__head">
					<div class="build__title">
						<b>Заголовок:</b>
						{{value.title}}
					</div>
					<div class="build__title">
						<b>Адрес:</b>
						{{value.address}}
					</div>
					<b class="build__price">{{value.price}}$</b>
				</div>
				<button v-if="!isShow" class="c-btn" @click="e=>isShow=true">Показать полностью</button>
				<div v-if="isShow" class="build__desc">{{value.desc}}</div>

				<div v-if="isShow" class="info">
					<p>
						<b>Количество комнат:</b>
						{{value.countroom}}/{{value.countroomMax}}
					</p>
					<p>
						<b>Площадь (жилая/общая/кухня):</b>
						{{value.live_area}}/{{value.total_area}}/{{value.kitchen_area}}
					</p>
					<p>
						<b>Этаж:</b>
						{{value.level}}/{{value.levelMax}}
					</p>
					<p>
						<b>Раздельный санузел:</b>
						{{value.restroom ? 'Да':'Нет'}}
					</p>
				</div>
				<button v-if="value.moderated !==0" class="c-btn allow" @click="e=>sendStatus(0)">Разрешить</button>
				<button
					v-if="value.moderated !==2"
					class="c-btn disallow"
					@click="e=>sendStatus(2)"
				>Заблокировать</button>
				<button
					v-if="value.moderated !==1"
					class="c-btn on-moderation"
					@click="e=>sendStatus(1)"
				>На проверку</button>
			</div>
		</template>
		<b v-else>Ошибка отображения</b>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: ["value"],
	data() {
		return {
			isShow: false
		};
	},
	filters: {
		dateFormat(value) {
			const date = new Date(value);
			return `${date.getDate()}/${date.getMonth() +
				1}/${date.getFullYear()}`;
		}
	},
	computed: {
		type_deal() {
			switch (this.value.type_deal) {
				case "rent":
					return "Аренда";
				case "sale":
					return "Продажа";
			}
		},
		type() {
			switch (this.value.type) {
				case "house":
					return "Дом";
				case "apartament":
					return "Квартира";
				case "room":
					return "Комната";
			}
		},
		statusClass() {
			switch (this.value.moderated) {
				case 0:
					return "allow";
				case 1:
					return "on-moderation";

				case 2:
					return "disallow";
				default:
					return "on-moderation";
			}
		},
		statusText() {
			switch (this.value.moderated) {
				case 0:
					return "Разрешино";
				case 1:
					return "На модерациии";

				case 2:
					return "Заблокировано";
				default:
					return "На модерациии";
			}
		}
	},
	methods: {
		sendStatus(status) {
			axios({
				url: this.$store.state.server + "/api/building/moderated",
				method: "post",
				data: {
					_id: this.value._id,
					value: status
				}
			}).then(({ data }) => {
				if (data.ok === 1) {
					this.$emit("input");
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.build {
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-top: 4px solid #d60000;
	margin: 0 0 10px;
	padding: 10px;
	width: 100%;
	background: white;
	position: relative;
	display: flex;

	&.allow {
		border-top-color: #00a017;
	}
	&.on-moderation {
		border-top-color: #ff8804;
	}
	&.disallow {
		border-top-color: #d60000;
	}
	.allow {
		background: #00a017;
	}
	.on-moderation {
		background: #ff8804;
	}
	.disallow {
		background: #d60000;
	}
	&:hover &__top {
		opacity: 1;
	}
	&__photo {
		flex: 0 0 200px;
		margin-right: 20px;
		img {
		}
	}
	&__top {
		display: flex;
		margin: 10px 0;
		opacity: 0;
		transition-duration: 0.3s;
		position: absolute;
		top: -20px;
		right: 0;
	}
	&__date {
		font-size: 12px;
	}
	&__prop {
		color: white;
		font-size: 10px;
		padding: 2px 10px;
		font-weight: 700;
		line-height: 1em;
		margin-right: 5px;
		background: #d60000;
		&--type-deal {
			background: #d60000;
		}
		&--type {
		}
	}
	&__title {
		font-size: 13px;
		margin-bottom: 10px;
	}
	&__desc {
		margin: 10px 0;
		font-size: 12px;
	}
}
</style>