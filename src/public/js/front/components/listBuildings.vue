<template lang="pug">
	div()
		.list(ref="reflist")
			template(v-if="mounted && ready")
				.list__el( v-for="item in list" :class="'col-'+cols")
					building(:key="item._id" :el="item")
</template>
<script>
import building from './Building.vue';
export default {
	name: 'listbuild',
	props: ['list'],
	data() {
		return {
			countItems: 5,
			currentPage: 1,
			size: 3,
			cols: 4,
			mounted: false,
			ready: false
		};
	},
	components: {
		building
	},
	mounted() {
		this.mounted = true;
		this.calcWidth();
		window.addEventListener('resize', this.calcWidth.bind(this));
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.calcWidth.bind(this));
	},
	methods: {
		calcWidth() {
			this.ready = false;
			const ref = this.$refs.reflist;
			if (ref) {
				const wdth = ref.clientWidth || ref.innerWidth;
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
			this.ready = true;
		}
	}
};
</script>
<style lang="scss" scoped>
.list {
	margin-left: -20px;
	&__el {
		display: inline-block;
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
