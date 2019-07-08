<template lang="pug">
    .pag
        a.pag__item(v-for="i of countPage",v-on:click="click(i,$event )",href="#") {{i}}
        

</template>
<script>
export default {
	name: "pag",
	props: ["total_count", "size"],
	data() {
		return {
			countPage: 0
		};
	},
	watch: {
		total_count() {
			this.total_count =
				this.total_count === undefined ? 1 : this.total_count;
			var a = Math.ceil(parseInt(this.total_count) / parseInt(this.size));
			this.countPage = a;
		}
	},
	methods: {
		calcPage() {},
		click(i, ev) {
			ev.preventDefault();
			this.$emit("changepage", i);
		}
	}
};
</script>
<style lang="scss" scoped>
.pag {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 15px;
	&__item {
		padding: 3px 5px;
		display: inline-block;
		background: white;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 3px;
		margin: 0 3px;
		color: black;
		text-decoration: none;
		&--active,
		&:hover {
			background: rgba(0, 0, 0, 0.7);
			color: white;
		}
	}
}
</style>
