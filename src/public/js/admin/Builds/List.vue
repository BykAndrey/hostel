<template >
	<div class="box">
		<h1>Объявления({{countElements}})</h1>
		<select v-model="moderated">
			<option value="all">Все</option>
			<option value="0">Проверено</option>
			<option value="1">На проверке</option>
			<option value="2">Заблокированные</option>
		</select>
		<div class="list">
			<build v-for="item in items" :key="item._id" :value="item" @input="loadPage" />
		</div>
		<pagination :value="page" :totalCount="countElements" :size="size" @input="changepage" />
	</div>
</template>
<script>
import axios from "axios";
import build from "./build";
import pagination from "./../../common/pag";
export default {
	components: {
		build,
		pagination
	},
	data() {
		return {
			page: 1,
			size: 4,
			countElements: 0,
			items: [],
			moderated: "all"
		};
	},
	computed: {
		params() {
			return {
				page: this.page,
				size: this.size,
				moderated: this.moderated,
				sort: "moderated:desc"
			};
		}
	},
	watch: {
		params() {
			this.loadPage();
		}
	},
	mounted() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			axios({
				url: this.$store.state.server + "/api/building",
				params: this.params
			}).then(({ data }) => {
				this.countElements = data.count;
				this.items = data.data;
			});
		},
		changepage(page) {
			this.page = page;
		}
	}
};
</script>
<style lang="scss" scoped>
.box {
	background: #f5f5f5;
	padding: 20px;
	flex: 0 1 700px;
}
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 10px;
}
h1 {
	font-size: 22px;
	padding: 20px 10px;
}
</style>