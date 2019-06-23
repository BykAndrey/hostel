<template lang="pug">
	.p-catalog.container(:class="!onMap?'p-catalog--map':''")
		h1.p-catalog__title(v-if="onMap") Каталог
		//list-buildings
		.p-catalog__center
			.aside(:class="!onMap?'aside--map':''")
				.aside__prop
					label
						input(type="checkbox" v-model="onMap")
						span Списком
					.aside__title Страна
					.aside__box
						select(v-model="countryId" placeholder= "Страна")
							option( value="all") Все
							option(v-for="country in countriesList" :value="country._id") {{ country.name }}

					.aside__title(v-if="countryId && countryId!=='all'") Город
					.aside__box(v-if="countryId && countryId!=='all'")
						select(v-model="cityId" placeholder= "Город")
							option( value="all") Все
							option(v-for="city in cityCountry" :value="city._id") {{ city.name }}
					
					.aside__title(v-if="cityId!=='all'&&!onMap") Сектор
					.aside__box(v-if="cityId!=='all'&&!onMap")
						select(v-model="currentRegionId" placeholder= "Район")
							option( value="all") Все
							option(v-for="reg in regionsList" :value="reg.properties.osmId") {{ reg.properties.name }}

					.aside__title(v-if="cityId && cityId !=='all' && metro") Метро
					.aside__box(v-if="cityId && cityId !=='all' && metro")
						select(v-model="currentmetro")
							option( value="all") Все
							option(v-for="(station, i) in metro" :key="i" :value="station") {{station}}

					.aside__title Цена
					.aside__box
						.price
							input(type="number" placeholder="Минимальная цена" v-model="minprice")
							input(type="number" placeholder="Максимальная цена" v-model="maxprice")
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
						radio(v-model="countRoom" :name="'countRoom'" val="all" title="Все")
						radio(v-model="countRoom" :name="'countRoom'" val="1" title="1")
						radio(v-model="countRoom" :name="'countRoom'" val="2" title="2")
						radio(v-model="countRoom" :name="'countRoom'" val="3" title="3")
						radio(v-model="countRoom" :name="'countRoom'" val="more4" title="4+")
					
				
			.p-catalog__items
				Map(:class="!onMap?'map--map':''" :value="[[0,0]]" :builds="items" v-if="!onMap" :polygon="currentRegion"  keep-alive)
				listBuildings(v-if="onMap" :list="items")
</template>
<script>
import axios from "axios";
import building from "../components/Building.vue";
import listBuildings from "../components/listBuildings.vue";
import Map from "../components/map.vue";
import radio from "../components/radio.vue";
import osme from "osme";
export default {
  name: "catalog",
  components: {
    building,
    listBuildings,
    Map,
    radio
  },
  data() {
    return {
      //metro: metro,
      countriesList: [],
      countryId: "all",
      citiesList: [],
      cityId: "all",
      currentmetro: "all",
      onMap: true,
      search: "",
      allitems: [],
      cuurentList: [],
      minprice: 0,
      maxprice: 0,
      dealType: "all",
      houseType: "all",
      countRoom: "all",
      regionsList: [],
      currentRegionId: "all"
    };
  },

  created() {
    const self = this;
    console.log("=" + this.$store.state.server);

    axios({
      url: self.$store.state.server + "/api/building"
    })
      .then(data => {
        self.items = data.data.data;
        this.allitems = data.data.data;
        console.log(self.items);
      })
      .catch(function(e) {
        console.error(e);
      });
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
    items() {
      let list = this.allitems.slice();
      if (this.countryId !== "all") {
        list = this.FilterCountry(list);
      }
      if (this.cityId !== "all") {
        list = this.FilterCity(list);
      }
      if (this.currentmetro !== "all") {
        list = this.metroFilter(list);
      }
      if (this.dealType !== "all") {
        list = this.FilterDeal(list);
      }
      if (this.houseType !== "all") {
        list = this.FilterBuild(list);
      }
      if (this.countRoom !== "all") {
        list = this.FilterCountRoom(list);
      }
      list = this.priceFilter(list);
      return list;
    },
    metro() {
      let data = this.citiesList.filter(el => {
        return el._id === this.cityId;
      })[0];
      return data ? data.metro : null;
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
      return polygon ? polygon : null;
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
    cityId(val) {
      this.currentmetro = "all";
      if (this.cityId == "all") {
        this.currentRegionId = null;
      }
    },
    regionsList() {
      if (this.regionsList.length > 0) {
        this.currentRegionId = this.regionsList[0].properties.osmId;
      }
    },
    currentCity() {
      this.regions(this.currentCity ? this.currentCity.osme : null);
    }
  },
  methods: {
    FilterCountry(list) {
      return list.filter(build => {
        if (build.country_id && build.country_id._id)
          return build.country_id._id === this.countryId;
        else return false;
      });
    },
    FilterCity(list) {
      return list.filter(build => {
        if (build.city_id && build.city_id._id)
          return build.city_id._id === this.cityId;
        else return false;
      });
    },
    priceFilter(list) {
      return list.filter(e => {
        if (this.maxprice >= 1)
          return e.price <= this.maxprice && e.price >= this.minprice;
        else return e.price >= this.minprice;
      });
    },
    metroFilter(list) {
      if (this.currentmetro == "") {
        return list;
      } else {
        return list.filter(e => {
          return e.metro.indexOf(this.currentmetro) !== -1 ? true : false;
        });
      }
    },
    FilterDeal(list) {
      return list.filter(el => {
        return el.type_deal === this.dealType;
      });
    },
    FilterBuild(list) {
      return list.filter(el => {
        return el.type === this.houseType;
      });
    },
    FilterCountRoom(list) {
      return list.filter(el => {
        if (this.countRoom !== "more4") {
          return el.countroom === +this.countRoom;
        } else {
          return el.countroom >= 4;
        }
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
.p-catalog {
  position: relative;
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
  input {
    display: block;
    flex: 0 0 50%;
    padding: 0;
    text-align: center;
  }
}
</style>
