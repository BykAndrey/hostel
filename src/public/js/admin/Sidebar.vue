<template lang="pug">
	aside.sidebar
		.sidebar__title Навигация
		.sidebar__wrap
			ul.sidebar__list
				li.sidebar__item()
					router-link(to="/countries") Страны
				li.sidebar__item()
					router-link(to="/city") Города
				li.sidebar__item()
					router-link(to="/builds") Объявления
</template>
<script>
export default {
	name: "sidebar",
	data() {
		return {
			tables: [
				{
					name: "Пользователи"
				}
			]
		};
	}
};
</script>
<style lang="scss">
$color: rgba(0, 0, 200, 0.3);
.sidebar {
	border-right: 1px solid rgba(0, 0, 0, 0.1);
	flex: 0 1 300px;
	background: white;
	&__title {
		font-weight: 500;
		padding: 15px 15px;
		font-size: 15px;
	}
	&__list {
	}
	&__item {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		a {
			padding: 10px 15px;
			display: block;
			color: black;
			&:hover {
				background: $color;
				color: white;
			}
		}
	}
}
</style>