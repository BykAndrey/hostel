<template lang="pug">
	.el-building
		.el-building__price {{el.price}}&nbsp;$
		.el-building__photo
			swiper(:options='swiperOption', ref='mySwiper')
					swiper-slide(v-for="i in el.photo")
						.image(:style=`'background-image: url(' + i.url + ')'`)
		.el-building__head
			p {{ typeBuild }} {{ typeDeal }}
			p(v-if="el.country_id && el.city_id") 
				| {{ el.country_id.name }}, {{ el.city_id.name }}, 
				| {{ el.address }}
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
        if (this.el.user_id._id === us) {
          return true;
        }
      }
      return false;
    },
    typeDeal() {
      let data = {
        sale: "Продажа",
        rent: "Аренда"
      };
      return data[this.el.type_deal];
    },
    typeBuild() {
      let data = {
        apartament: "Квартира",
        room: "Комната",
        house: "Дом"
      };
      return data[this.el.type];
    }
  }
};
</script>
<style lang="scss">
.el-building {
  flex: 0 1 250px;
  position: relative;
  max-width: 250px;

  border-radius: 2px;

  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition-duration: 0.3s;
  &:hover {
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.15),
      0 2px 3px rgba(0, 0, 0, 0.2);
  }
  &__photo {
    height: 150px;
    margin-bottom: 10px;
    .image {
      object-fit: contain;
      width: 100%;
      height: 150px;
    }
  }
  &__head {
    margin-bottom: 10px;
    padding: 10px;
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
    margin-top: 10px;
    li {
      font-size: 11px;
      list-style: none;
      display: inline-block;
      margin: 0 3px 3px 0;
      padding: 2px 5px;
      color: white;
      background: rgb(214, 0, 0);
    }
  }
}
</style>
