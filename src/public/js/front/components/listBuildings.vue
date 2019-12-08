<template lang="pug">
	div()
		.list(ref="reflist")
			.list__el(v-if="mounted" v-for="item in list" :class="'col-'+cols")
				building(:el="item")
</template>
<script>
import building from "./Building.vue";
export default {
	name: "listbuild",
	props: ["list"],
	data() {
		return {
			countItems: 5,
			currentPage: 1,
			size: 3,
			cols: 4,
			mounted: false
		};
	},
	components: {
		building
	},
	mounted() {
		this.mounted = true;
		this.calcWidth();
		window.addEventListener("resize", this.calcWidth.bind(this));
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.calcWidth.bind(this));
	},
	methods: {
		calcWidth() {
			const ref = this.$refs.reflist;

			if (ref) {
				const wdth = ref.clientWidth;
				if (wdth > 960) {
					this.cols = 4;
				} else if (wdth > 750) {
					this.cols = 3;
				} else if (wdth > 500) {
					this.cols = 2;
				} else if (wdth > 400) {
					this.cols = 1;
				}
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-left: -20px;
	&__el {
		width: calc(25% - 20px);
		margin-left: 20px;
		margin-bottom: 20px;
	}
	.col-4 {
		width: calc(25% - 20px);
	}
	.col-3 {
		width: calc(33.33% - 20px);
	}
	.col-2 {
		width: calc(50% - 20px);
	}
	.col-1 {
		width: calc(100% - 20px);
	}
}
</style>
