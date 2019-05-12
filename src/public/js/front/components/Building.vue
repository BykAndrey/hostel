<template lang="pug">
	.el-building
		.el-building__price {{el.price}}&nbsp;$
		.el-building__photo
			swiper(:options='swiperOption', ref='mySwiper')
					swiper-slide(v-for="i in el.photo")
						img(:src="i.url" width="100%")
		.el-building__head
			router-link.el-building__title(:to="'/'+el._id") {{el.title}} 
				
			router-link(v-if="user" :to="'/'+el._id+'/edit'") Редактировать
			.el-building__date {{date}}    
			ul.el-building__metro
				template(v-for="item in el.metro")
					li(v-if="item!=='no'") {{item}}
</template>
<script>
export default {
  name: "building",
  props: ["el"],
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
      }
    };
  },

  computed: {
    date() {
      let d = new Date(this.el.createdAt);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
    user() {
      let us = this.$store.state.idUser;
      console.log({ us });
      if (us !== undefined) {
        if (this.el.user_id === us) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
.el-building {
  flex: 0 1 250px;
  position: relative;
  max-width: 250px;
  padding: 10px;
  border-radius: 2px;

  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);

  &__photo {
    height: 150px;
  }
  img {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  &__head {
    margin-bottom: 10px;
  }
  &__title {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
  }
  &__price {
    top: 0;
    right: 0;
    position: absolute;
    font-size: 14px;
    color: white;
    padding: 4px 17px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    font-weight: 700;
    border-radius: 0 3px 0 0;
  }
  &__address {
    font-size: 18px;
    font-weight: 700;
    span {
      color: rgba(255, 0, 0, 0.7);
    }
  }
  &__date {
    top: 0;
    left: 0;
    position: absolute;
    font-size: 14px;

    color: white;
    padding: 4px 17px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    font-weight: 700;
    border-radius: 0 0 0 3px;
  }
  &__desc {
    font-size: 14px;
    p:not(:last-child) {
      margin-bottom: 1px;
    }
  }
  &__metro {
    li {
      list-style: none;
      display: inline-block;
      margin: 0 10px 5px 0;
      color: red;
    }
  }
}
</style>
