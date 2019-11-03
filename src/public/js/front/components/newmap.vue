<template lang="pug">
		fieldset.map
			legend Адрес
			label.field
				b.field__title Автоматически определять точку на карте
				input(type="checkbox" v-model="autoDetectCoordinates")
			label.field
				b.field__title Адрес
				.field__value
					input.c-input(id='suggest-address',v-model='address' multiline @input="handlerAddressInput" @change="e=> handlerAddressChange(autoDetectCoordinates)")
					p(v-if="!autoDetectCoordinates") Введите адрес и нажмите "Показать на карте"
					button.c-btn(v-if="!autoDetectCoordinates" @click ="handlerShowAtMap") Показать на карте       
			fieldset.suggest-list(v-if="suggest_address.length")
				legend Возможно эти адреса Вам подходят
				.item(v-for="item in suggest_address")
					.item__title {{getAddressString(item)}}
					.item__btn
						button.c-btn(@click="setAddress(item)") Применить
			#map

</template>
<script>
import { getSimpleAddressFromObject } from "./../../help/utils";
export default {
  props: {
    coords: null,
    init_address: null
  },
  watch: {
    coords(val) {
      if (val && this.setPosition) {
        this.setPosition(val);
      }
    }
  },
  data: () => ({
    Map: null,
    point: null,
    address: "",
    suggest_address: [],
    suggestView: null,
    autoDetectCoordinates: true
  }),
  watch: {},
  mounted() {
    this.createMap();
  },
  methods: {
    getAddressString: getSimpleAddressFromObject,
    setAddress(ad) {
      this.address = this.getAddressString(ad);

      this.suggest_address = [];
      this.sendData();
    },
    handlerAddressInput() {
      this.suggest_address = [];
      if (!this.suggestView) {
        this.suggestView = new this.$ymaps.SuggestView("suggest-address");
      }
    },
    async handlerShowAtMap() {
      this.handlerAddressChange(true);
    },
    async handlerAddressChange(detect = true) {
      this.suggest_address = [];
      if (this.suggestView) {
        this.suggestView.destroy();
        this.suggestView = null;
      }
      let coords = this.coords;
      if (detect) {
        coords = await this.getCoordinatesFromAddress(this.address);
        this.Map.setCenter(coords, 15);
      }
      this.sendData(coords);
    },
    async handlerDragEnd(event) {
      this.suggest_address = await this.getAddressFromCoordinates(
        this.point.geometry.getCoordinates()
      );
      this.sendData(this.point.geometry.getCoordinates());
    },
    sendData(coords) {
      this.$emit("get_address", {
        coords: coords || this.coords,
        address: this.address
      });
    },
    async createMap() {
      if (this.$ymaps) {
        let coords = [0, 0];
        if (this.coords && Array.isArray(this.coords)) {
          coords = this.coords;
        }
        this.address = this.init_address;
        const { Map, Placemark } = this.$ymaps;
        this.Map = new Map(
          "map",
          {
            center: coords,
            zoom: 5
          },
          {
            searchControlProvider: "yandex#search"
          }
        );

        this.point = new Placemark(
          coords,
          {},
          {
            draggable: 1
          }
        );
        this.point.events.add("dragend", this.handlerDragEnd.bind(this));
        this.Map.events.add("click", async e => {
          this.setPosition(e.get("coords"));
          this.suggest_address = await this.getAddressFromCoordinates(
            e.get("coords")
          );
          this.sendData(e.get("coords"));
        });
        this.Map.geoObjects.add(this.point);
        this.Map.setCenter(coords, 15);
      }
    },
    setPosition(coords) {
      if (coords) {
        this.point.geometry.setCoordinates(coords);
      }
    },
    async getCoordinatesFromAddress(address) {
      var res = await this.$ymaps.geocode(address, { results: 1 });
      var Point = res.geoObjects.get(0);
      if (Point) {
        const coords = Point.geometry.getCoordinates();
        this.setPosition(coords);
        return coords;
      }
      return this.coords;
    },
    async getAddressFromCoordinates(coords) {
      const res = await this.$ymaps.geocode(coords, { results: 3 });
      if (res) {
        return res.geoObjects.toArray().map(e => {
          return {
            country: e.getCountry(),
            locales: e.getLocalities(),
            street: e.getThoroughfare(),
            premise: e.getPremise(),
            premiseNumber: e.getPremiseNumber(),
            country_code: e.getCountryCode(),
            areas: e.getAdministrativeAreas()
          };
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.map {
  display: flex;
  margin-bottom: 30px;
  &__left {
    flex: 0 0 600px;
  }
  &__right {
    flex: 1 0 auto;
  }
  .c-input {
    width: 100%;
  }
}
#map {
  margin-top: 30px;
  height: 500px;
  width: 100%;
}
#new-map {
}
.suggest-list .item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  &__title {
    font-size: 14px;
    flex: 1 0 350px;
  }
  .c-btn {
    margin: 0;
  }
}
.address {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}
</style>