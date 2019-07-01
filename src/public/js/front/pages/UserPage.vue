<template lang="pug">
	.p-user.container
		h1.p-user__title Страница пользователя
		fieldset.p-user__data
			legend {{user.name}}
			.field
				.field__title ФИО
				.field__value 
					input.c-input(v-model="inf.name" type="text")

			.field
				.field__title Телефон
				.field__value 
					input.c-input(v-model="inf.phone" type="text")
			button.c-btn(@click="save" type='submit') Сохранить
			hr
			createBuild
			hr
			list-buildings(:list="list")

</template>
<script>
import axios from "axios";
import listBuildings from "./../components/listBuildings.vue";
import createBuild from "./../components/createBuild.vue";
export default {
	name: "userPage",
	components: {
		listBuildings,
		createBuild
	},
	data() {
		return {
			buildigns: [],
			list: [],
			inf: {
				name: "",
				phone: ""
			}
		};
	},

	created() {
		this.$store.dispatch("GET_COOKIE").then(() => {
			this.$store.dispatch("CHECK_USER").then(() => {
				this.$store.dispatch("GET_PROFILE");
			});
		});
		axios({
			method: "get",
			url: this.$store.state.server + "/api/building/user",
			headers: {
				Authorization: `Bearer ${this.$store.state.userData.token}`
			}
		}).then(({ data }) => {
			this.list = data.data;
		});
	},
	computed: {
		user() {
			var user = this.$store.state.user;
			return this.$store.state.userData;
		}
	},
	watch: {
		user() {
			this.inf = this.user;
		}
	},
	methods: {
		save() {
			axios({
				method: "put",
				url: this.$store.state.server + "/api/users",
				headers: {
					Authorization: `Bearer ${this.$store.state.userData.token}`
				},
				data: this.inf
			});
		}
	}
};
</script>
<style lang="scss">
fieldset {
	padding: 20px;
}
legend {
	font-size: 16px;
	font-weight: 700;
}
.field {
	display: flex;
	&:not(:last-child) {
		margin-bottom: 10px;
	}
	&__title {
		flex: 0 1 300px;
		font-size: 14px;
	}
	&__value {
	}
}
hr {
	margin: 20px 0;
}
</style>
