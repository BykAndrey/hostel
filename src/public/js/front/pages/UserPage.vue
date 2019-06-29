<template lang="pug">
	.p-user.container
		h1.p-user__title Страница пользователя
		fieldset.p-user__data
			legend {{user.name}}
			p {{user.mail}}
			p {{user.age}}
			br
			br
			hr
			createBuild
			br
			br
			list-buildings()

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
      buildigns: []
    };
  },

  created() {
    console.log("userPAge");
    this.$store.dispatch("GET_COOKIE").then(() => {
      this.$store.dispatch("CHECK_USER").then(() => {
        this.$store.dispatch("GET_PROFILE");
      });
    });
  },
  computed: {
    user() {
      var user = this.$store.state.user;
      return this.$store.state.userData;
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
</style>
