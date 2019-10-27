<template lang="pug">
	.work-cirle
		label.c-check
			input(type="checkbox" @change="showChange")
			span.c-check__wrap
				span.c-check__box
				span.c-check__label Указать место работы и радиус поиска(метры)
		.work-cirle__wrap(v-if="show")
			label.item
				.item__title {{`Радиус поиска (100м-9900м): ` + size+' метров'}} 
				input.item__input.c-input(type="range" max="9999" min="100" step="100" @change="changeSize")
</template>
<script>
export default {
	props: ["value"],
	data() {
		return {
			coords: [0, 0],
			size: 100
		};
	},
	computed: {
		show() {
			return this.value;
		}
	},
	watch: {},
	methods: {
		changePlace(e) {
			this.$ymaps.geocode(e.target.value, { results: 1 }).then(res => {
				this.coords = res.geoObjects.get(0).geometry.getCoordinates();
				this.$emit("change", {
					coordinates: this.coords,
					size: this.size
				});
			});
		},
		changeSize(e) {
			let size =
				e.target.value && e.target.value.trim() !== ""
					? parseInt(e.target.value)
					: 0;
			this.size = size;
			this.$emit("change", {
				coordinates: this.coords,
				size: size
			});
		},
		showChange() {
			this.$emit("input", !this.show);
		}
	}
};
</script>
<style lang="scss" scoped>
.work-cirle {
	margin-bottom: 20px;
	&__wrap {
		margin-top: 20px;
	}
	.item {
		&__title {
			font-size: 14px;
		}
		&__input {
			width: 100%;
		}
	}
}
</style>