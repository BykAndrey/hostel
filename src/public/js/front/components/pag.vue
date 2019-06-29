<template lang="pug">
	.pag
		button.pag__item(v-for="item in count" :class="item===value ? 'active' : '' " @click="$emit('input', item)") {{ item }}
</template>

<script>
export default {
	props: {
		totalCount: Number,
		size: Number,
		value: Number
	},
	computed: {
		count() {
			return Math.ceil(this.totalCount / this.size);
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../../css/config.scss";
.pag {
	display: flex;
	align-items: center;
	justify-content: center;
	&__item {
		padding: 7px;
		border: 1px solid $color;
		color: white;
		background: $color;
		font-size: 14px;
		cursor: pointer;
		&:hover,
		&.active {
			background: white;
			color: $color;
		}
	}
}
</style>

