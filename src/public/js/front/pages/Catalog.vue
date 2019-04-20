<template lang="pug">
	.p-catalog.container
		h1.p-catalog__title Каталог
		//list-buildings
		.p-catalog__center
			.aside
				.aside__title Параметры поиска
				.aside__prop
					label
						input(type="checkbox" v-model="onMap")
						span Показать на карте
			.p-catalog__items
				Map(:value="[[0,0]]" :builds="items" v-if="onMap" keep-alive)
				listBuildings(v-if="onMap===false")
</template>
<script>
import axios from "axios";
import building from "../components/Building.vue";
import listBuildings from "../components/listBuildings.vue";
import Map from "../components/map.vue";
export default {
	name: "catalog",
	components: {
		building,
		listBuildings,
		Map
	},
	data() {
		return {
			onMap:true,
			items: []
		};
	},
	created() {
		const self = this;
		console.log("=" + this.$store.state.server);

		axios({
			url: self.$store.state.server + "/api/building"
		})
			.then(function(data) {
				self.items = data.data.data;
				console.log(self.items);
			})
			.catch(function(e) {
				console.error(e);
			});
	}
};
</script>
<style lang="scss" scoped>
.p-catalog{
	&__center{
		display: flex;
		
	}
	&__items{
		flex: 1 0 auto;
	}
}
.aside{
	flex:0 0 200px;
	background: white;
	box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
	border-radius:3px;
	padding: 10px;
	margin-right: 30px;
	[type="checkbox"]{
		height: 10px;
		width: 10px;
	}
	label{
		display: flex;
		align-items: center;
	}
}
</style>
