<template lang="pug">
	.p-catalog.container(:class="!onMap?'p-catalog--map':''")
		h1.p-catalog__title(v-if="onMap") Каталог
		//list-buildings
		.p-catalog__center
			.aside(:class="!onMap?'aside--map':''")
				.aside__prop
					label.on-map
						input(type="checkbox" v-model="onMap")
						span(v-if="!onMap") Списком
						span(v-if="onMap") На карте
					.aside__title Страна
					.aside__box
						select.c-select(v-model="countryId" placeholder= "Страна")
							option( value="all") Все
							option(v-for="country in countriesList" :value="country._id") {{ country.name }}

					.aside__title(v-if="countryId && countryId!=='all'") Город
					.aside__box(v-if="countryId && countryId!=='all'")
						select.c-select(v-model="cityId" placeholder= "Город")
							option( value="all") Все
							option(v-for="city in cityCountry" :value="city._id") {{ city.name }}
					
					.aside__title(v-if="cityId!=='all'&&!onMap") Сектор
					.aside__box(v-if="cityId!=='all'&&!onMap")
						select.c-select(v-model="currentRegionId" placeholder= "Район")
							option( value="all") Все
							option(v-for="reg in regionsList" :value="reg.properties.osmId") {{ reg.properties.name }}


					.aside__title Цена
					.aside__box
						.price
							input.c-input(type="number" placeholder="Минимальная цена" :value="minprice" @change="e=>minprice=+e.target.value")
							input.c-input(type="number" placeholder="Максимальная цена" :value="maxprice" @change="e=>maxprice=+e.target.value")
					.aside__title Тип строения	
					.aside__box
						radio(v-model="houseType" :name="'type'" val="all" title="Все")
						radio(v-model="houseType" :name="'type'" val="apartament" title="Квартира")
						radio(v-model="houseType" :name="'type'" val="room" title="Комната")
						radio(v-model="houseType" :name="'type'" val="house" title="Дом")
					.aside__title Тип сделки	
					.aside__box
						radio(v-model="dealType" :name="'deal'" val="all" title="Все")
						radio(v-model="dealType" :name="'deal'" val="sale" title="Продажа")
						radio(v-model="dealType" :name="'deal'" val="rent" title="Аренда")
					.aside__title Количество комнат	
					.aside__box 
						lineSelect(v-model="countRoom")
			.p-catalog__items(v-if="onMap")
				.b-sorting
					.item
						.item__title Отображать по
						.item__value
							select.c-select(v-model="sizePerPage")
								option(value="2") 2
								option(value="4") 4
								option(value="6") 6
								option(value="8") 8
					.item
						.item__title Сортировать по
						.item__value
							select.c-select(v-model="sortBy")
								option(value="date:desc") Дате: сначала новые
								option(value="date:asc") Дате: сначала старые
								option(value="price:asc") Цена: сначала дешевые
								option(value="price:desc") Цена: сначала дорогие

				listBuildings( :list="pageList")
				pag(v-if="totalCountItems > 0" :total-count="totalCountItems" :size="sizePerPage" v-model="currentPage")
			Map(:class="!onMap?'map--map':''" :value="[[0,0]]" :builds="pageList" v-if="!onMap" :polygon="currentRegion"  keep-alive)
</template>
<script>
import axios from "axios";
import building from "../components/Building.vue";
import listBuildings from "../components/listBuildings.vue";
import Map from "../components/map.vue";
import radio from "../components/radio.vue";
import lineSelect from "../components/lineSelect.vue";
import osme from "osme";
import pag from "../components/pag";
export default {
  name: "catalog",
  components: {
    building,
    listBuildings,
    Map,
    radio,
    lineSelect,
    pag
  },
  data() {
    return {
      sortBy: "date:desc",
      countriesList: [],
      countryId: "all",
      citiesList: [],
      cityId: "all",
      onMap: true,
      search: "",
      allitems: [],
      pageList: [],
      totalCountItems: 0,
      cuurentList: [],
      minprice: 0,
      maxprice: 0,
      dealType: "all",
      houseType: "all",
      countRoom: "all",
      regionsList: [],
      currentRegionId: "all",
      currentPage: 1,
      sizePerPage: 4
    };
  },

  created() {
    const self = this;
    axios({
      url: self.$store.state.server + "/api/countries"
    }).then(({ data }) => {
      this.countriesList = data;
      if (this.countriesList.length > 0) {
        this.countryId = this.countriesList[0]._id;
      }
    });
    axios({
      url: self.$store.state.server + "/api/city"
    }).then(({ data }) => {
      this.citiesList = data;
    });
  },
  computed: {
    cityCountry() {
      if (this.countryId !== null) {
        return this.citiesList.filter(city => {
          return city.country_id === this.countryId;
        });
      } else {
        return this.citiesList;
      }
    },
    currentCity() {
      let data = this.citiesList.filter(el => {
        return el._id === this.cityId;
      })[0];
      return data;
    },
    currentRegion() {
      let polygon = this.regionsList.filter(r => {
        return r.properties.osmId === this.currentRegionId;
      })[0];
      return polygon ? polygon : [];
    },
    filters() {
      if (!this.onMap) {
        this.currentPage = -1;
      }
      return {
        page: this.currentPage,
        size: this.sizePerPage,
        sort: this.sortBy,
        maxprice: this.maxprice,
        minprice: this.minprice,
        country_id: this.countryId,
        city_id: this.cityId,
        dealType: this.dealType,
        houseType: this.houseType,
        countRoom: this.countRoom
      };
    }
  },

  watch: {
    minprice(val) {
      this.minprice = +val;
    },
    maxprice(val) {
      this.maxprice = +val;
    },
    countryId(val) {
      this.currentRegionId = null;
      this.cityId = "all";
    },
    regionsList() {
      if (this.regionsList.length > 0) {
        this.currentRegionId = this.regionsList[0].properties.osmId;
      }
    },
    currentCity() {
      this.regions(this.currentCity ? this.currentCity.osme : []);
    },
    sizePerPage() {
      this.currentPage = 1;
    },
    filters() {
      this.getData();
    }
  },
  methods: {
    getData() {
      axios({
        url: this.$store.state.server + "/api/building",
        params: this.filters
      })
        .then(({ data }) => {
          this.totalCountItems = data.count;
          this.pageList = data.data;
        })
        .catch(function(e) {
          console.error(e);
        });
    },
    regions(osmeID) {
      osme.geoJSON(osmeID, { lang: "ru" }, data => {
        this.regionsList = data.features;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./../../../css/config.scss";
.p-catalog {
  position: relative;
  padding-top: 40px;
  &__title {
    margin-bottom: 20px;
    font-size: 18px;
  }
  &--map {
    max-width: 100%;
    padding: 0;
  }
  &__center {
    display: flex;
  }
  &__items {
    flex: 1 1 auto;
  }
}
.aside {
  flex: 0 0 200px;
  background: white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
  margin-right: 30px;
  &--map {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    overflow: auto;
    z-index: 1;
  }
  [type="checkbox"] {
    height: 10px;
    width: 10px;
  }
  label {
    display: flex;
    align-items: center;
  }
  &__title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  &__box {
    margin-bottom: 20px;
  }
  select {
    width: 100%;
    height: 30px;
    display: block;
  }
}
.price {
  display: flex;
  .c-input {
    display: block;
    flex: 0 0 50%;
    padding: 0;
    text-align: center;
    border-radius: 0;
    height: 35px;
  }
}
.on-map {
  display: block;
  width: 100%;
  input {
    display: none;
    &:checked + span {
      background: white;
      color: $color;
    }
  }
  span {
    transition-duration: 0.3s;
    display: block;
    color: white;
    background: $color;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    cursor: pointer;
    border: 1px solid $color;
    &:hover {
      opacity: 0.8;
    }
  }
}
.b-sorting {
  margin-bottom: 20px;
  .item {
    display: flex;
    align-items: center;
    &__title {
      font-size: 14px;
      margin-right: 10px;
    }
    &__value {
      .c-select {
        min-width: 50px;
      }
    }
  }
}
</style>
