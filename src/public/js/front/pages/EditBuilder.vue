<template lang="pug">
    .container
        createBuild(:value="$route.params.id")
</template>
<script>
import createBuild from "./../components/createBuild.vue";
export default {
	components: {
		createBuild
	}
};
</script>

