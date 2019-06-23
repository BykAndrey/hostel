<template lang="pug">
	.building.container
		.building__title {{item.address}} 
			b {{item.price}} $
		.building__slider 
			swiper(:options='swiperOption', ref='mySwiper')
				// slides
				swiper-slide(v-for="i in item.photo")
					img(:src="i.url")
				.swiper-pagination(slot='pagination')
				.swiper-button-prev(slot='button-prev')
				.swiper-button-next(slot='button-next')
				.swiper-scrollbar(slot='scrollbar')

		.building__desciption {{item.desc}}
		.building__map На карте
		Map(:builds='[item]')
</template>
<script>
import axios from "axios";
import Map from "../components/map.vue";
export default {
  components: {
    Map
  },
  beforeMount() {
    this.id = this.$route.params.id;
    axios({
      method: "get",
      url: this.$store.state.server + "/api/building/" + this.id
    }).then(({ data }) => {
      this.item = data;
    });
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      id: "-1",
      item: {}
    };
  }
};
</script>
<style lang="scss" scoped>
.building {
  padding: 22px;
  &__title {
    font-size: 22px;
    font-weight: 800;
  }
  &__desciption {
    font-size: 14px;
    line-height: 1.4em;
  }
  &__slider {
    img {
      display: block;
      max-width: 100%;
      max-height: 60vh;
      margin: auto;
    }
  }
}
</style>
