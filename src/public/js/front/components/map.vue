<template lang="pug">
		.map {{addressComp}}
			#map(v-if="scriptLoaded")
</template>
<script>
import { Promise } from "q";
import osme from "osme";
export default {
  props: ["value", "builds", "address", "osme"],
  data() {
    return {
      scriptLoaded: false,
      map: null,
      ymaps: null
    };
  },
  computed: {
    points() {
      return this.value;
    },
    items() {
      if (this.builds !== undefined && this.builds !== null) {
        return this.builds;
      } else {
        return null;
      }
    },
    addressComp() {
      return this.address;
    },
    osmeComp() {
      if (this.osme) {
        return this.osme;
      }
      return null;
    }
  },
  watch: {
    addressComp() {
      this.sendCoords();
      console.log("addressComp");
      this.getCoordinates()
        .then(data => {
          console.log("-");
          this.setPoint(data);
        })
        .catch(() => {
          console.log("-2");
        });
    },
    items() {
      this.setPoints();
    },
    osmeComp() {
      this.OSME();
    }
  },
  created() {
    console.log("created");
  },

  mounted() {
    var self = this;
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://api-maps.yandex.ru/2.1.73/?lang=ru_RU"
    );
    document.head.appendChild(recaptchaScript);
    recaptchaScript.onload = () => {
      this.scriptLoaded = true;
      ymaps.ready(() => {
        this.ymaps = ymaps;
        this.map = new ymaps.Map(
          "map",
          {
            center: [0, 0],
            zoom: 1
          },
          {
            searchControlProvider: "yandex#search"
          }
        );

        console.log(this.addressComp);
        if (true) {
          console.log(this.addressComp);
          this.getCoordinates()
            .then(data => {
              console.log("-");
              this.setPoint(data);
            })
            .catch(() => {
              console.log("-2");
            });
          console.log(this.addressComp);
        }
        console.log(this.addressComp);
        this.setPoints();
      });
    };
  },
  methods: {
    setPoint(c) {
      console.log(1);
      this.map.geoObjects.removeAll();
      this.map.setCenter(c);
      this.map.setZoom(17);
      console.log(2);
      var myPlacemark = new this.ymaps.Placemark(c, {}, {});
      this.map.geoObjects.add(myPlacemark);
      console.log("create");
    },
    getCoordinates() {
      return new Promise((resolve, rej) => {
        console.log(this.ymaps);
        if (this.ymaps) {
          let coords = this.ymaps.geocode(this.addressComp);
          coords.then(
            res => {
              console.log(
                res.geoObjects.get(0).properties.get("metaDataProperty")
              );
              let val = res.geoObjects.get(0).geometry.getCoordinates();
              console.log("getCoordinates2", val);
              resolve(val);
            },
            err => {
              rej([0, 0]);
            }
          );
        } else {
          rej([0, 0]);
        }
      });
    },
    async sendCoords() {
      let c = null;
      await this.getCoordinates()
        .then(data => {
          c = data;
          this.$emit("coords", c);
          this.setPoint(c);
        })
        .catch(e => {
          console.log(e);
        });
    },
    setPoints() {
      if (this.items) {
        this.map.geoObjects.removeAll();
        this.items.forEach(e => {
          var myPlacemark = new ymaps.Placemark(e.chords, {}, {});
          this.map.geoObjects.add(myPlacemark);
        });
      }
    },
    OSME() {}
  }
};
</script>
<style lang="scss">
#map {
  height: 300px;
}
.map--map {
  #map {
    height: 100vh;
    width: 100vw;
  }
}
</style>

