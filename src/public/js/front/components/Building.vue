<template lang="pug">
	.el-building
		.el-building__price {{el.price}}&nbsp;$
		.el-building__date {{date}}
		.el-building__photo
			swiper(:options='swiperOption', ref='mySwiper')
					swiper-slide(v-for="i in el.photo")
						.image(:style=`'background-image: url(' + i.url + ')'`)
		.el-building__head
			.prop
				router-link.el-building__title(:to="'/'+el._id") {{el.title}} 
			
			.prop 
				p Тип жилья: {{ typeBuild }}
				p Тип сделки {{ typeDeal }}
			.prop
				.el-building__address(:title="fullAddress") {{ address }}
			.prop(v-if="el.metro && el.metro.length > 0")
				ul.el-building__metro
					template(v-for="item in el.metro")
						li(v-if="item!=='no'") {{item}}
		router-link.c-btn.el-building__details(:to="'/'+el._id") Подробнее
		router-link.c-btn.el-building__edit(v-if="user" :to="'/'+el._id+'/edit'") Редактировать
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
      if (this.$store.state.userData) {
        if (this.el.user_id._id === this.$store.state.userData._id) {
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
    },
    address() {
      return `${this.el.city_id.name}  ${this.el.address}`;
    },
    fullAddress() {
      return `${this.el.country_id.name}  ${this.el.city_id.name}  ${
        this.el.address
      }`;
    }
  },
  created() {}
};
</script>
<style lang="scss">
.el-building {
  width: 100%;
  position: relative;
  border-radius: 2px;
  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2);
  transition-duration: 0.3s;
  overflow: hidden;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.15),
      0 2px 3px rgba(0, 0, 0, 0.2);
  }
  &__photo {
    height: 150px;
    .image {
      object-fit: contain;
      width: 100%;
      height: 150px;
    }
  }
  &__details {
    margin-top: 10px;
    border-radius: 0;
  }
  &__head {
    //padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    .prop {
      padding: 7px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  &__title {
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
    display: block;
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
    font-size: 13px;
    font-weight: 300;
    line-height: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
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
  &__edit {
    border-radius: 0;
    font-size: 12px;
  }
}
</style>
