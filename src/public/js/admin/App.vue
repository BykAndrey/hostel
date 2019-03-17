<template lang="pug">
	.wrapper
		Header
		main.main
			sidebar
			.main__content
				router-view
</template>
<script>


import Header from "./Header.vue";
import sidebar from "./Sidebar.vue";

import listtable from "./tableList.vue";
export default {
	name:'app',
	components:{
		Header,
		sidebar,
		listtable
	}
}
</script>
<style lang="scss">
	.main{
		display: flex;
		flex:1 1 auto;
		&__content{
			flex:1 1 auto;
		}
	}
</style>
