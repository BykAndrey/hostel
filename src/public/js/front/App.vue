<template lang="pug">
	.wrapper
		v_header
		router-view
		
</template>
<script>
import v_header from "./components/Header.vue";
export default {
  name: "app",
  components: {
    v_header
  },
  beforeMount() {
    this.$store.dispatch("GET_COOKIE").then(e => {
      this.$store.dispatch("CHECK_USER").then(() => {
        this.$store.dispatch("GET_PROFILE");
      });
    });
    this.$store.dispatch("sessionUser");
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
</style>
