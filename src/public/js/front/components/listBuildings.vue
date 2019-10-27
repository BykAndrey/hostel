<template lang="pug">
	div()
		.list(ref="reflist")
			.list__el(v-for="item in list" :class="'col-'+cols")
				building(:el="item")
		pag(v-bind:total_count="countItems", v-bind:size="size", v-on:changepage="changePage")
</template>
<script>
import axios from "axios";
import building from "./Building.vue";
import pag from "./../../common/pag.vue";
export default {
	name: "listbuild",
	props: ["list"],
	data() {
		return {
			countItems: 5,
			currentPage: 1,
			size: 3,
			cols: 4
		};
	},
	components: {
		building,
		pag
	},
	created() {
		this.loadPage();
	},
	mounted() {
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
		},
		loadPage() {
			var self = this;

			/* axios({
				method: "get",
				url: self.$store.state.server + "/api/building",
				headers: {
					"Content-type": "application/json"
				},
				params: {
					size: self.size,
					page: self.currentPage
				}
			})
				.then(function(data) {
					self.list = data.data.data;
					self.countItems = data.data.count;
		
				})
				.catch(function(e) {
					console.error(e);
				});*/
		},
		changePage(page, e) {
			this.currentPage = page >= 0 ? page : 1;
			this.loadPage();
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
