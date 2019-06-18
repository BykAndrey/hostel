<template lang="pug">
	div()
		.list
			building(v-for="item in list" :el="item")
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
      list: [],
      countItems: 5,
      currentPage: 1,
      size: 3
    };
  },
  components: {
    building,
    pag
  },
  created() {
    this.loadPage();
  },

  methods: {
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
          console.log("self.countItems:" + self.countItems);
        })
        .catch(function(e) {
          console.error(e);
        });*/
    },
    changePage(page, e) {
      this.currentPage = page >= 0 ? page : 1;
      console.log(`currentPage: ${this.currentPage}`);
      this.loadPage();
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
