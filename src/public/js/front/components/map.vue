<template lang="pug">
		.map {{addressComp}}
			#map(v-if="scriptLoaded")
</template>
<script>
import { Promise } from "q";
import osme from "osme";
export default {
  props: ["value", "builds", "address", "osme", "polygon"],
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
    },
    polygon() {
      this.setPoints();
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
      let center = [0, 0];
      if (this.builds && this.builds.length == 1) {
        center = this.builds[0].chords;
      }
      ymaps.ready(() => {
        this.ymaps = ymaps;
        this.map = new ymaps.Map(
          "map",
          {
            center: center,
            zoom: 5
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
      this.map.geoObjects.removeAll();
      this.map.setCenter(c);
      this.map.setZoom(17);
      var myPlacemark = new this.ymaps.Placemark(c, {}, {});
      this.map.geoObjects.add(myPlacemark);
    },
    getCoordinates() {
      return new Promise((resolve, rej) => {
        if (this.ymaps) {
          let coords = this.ymaps.geocode(this.addressComp);
          coords.then(
            res => {
              let val = res.geoObjects.get(0).geometry.getCoordinates();
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
          console.error(e);
        });
    },

    addEvents() {
      let btn = document.querySelectorAll(".ballon-btn");

      if (btn.length > 0) {
        btn[0].addEventListener("click", e => {
          e.preventDefault();
          let _id = e.target.getAttribute("data-value");
          this.$router.push(`/${_id}`);
        });
      }
    },
    setPoints() {
      if (this.items) {
        this.map.geoObjects.removeAll();
        let clusterer = new this.ymaps.Clusterer({
          preset: "islands#invertedVioletClusterIcons",
          groupByCoordinates: false,
          clusterDisableClickZoom: true,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false
        });
        let elem = this.items.map((e, id) => {
          let country = "";
          let city = "";
          if (e.country_id) {
            country = e.country_id.name;
          }
          if (e.city_id) {
            city = e.city_id.name;
          }
          return {
            type: "Feature",
            properties: {
              balloonContentFooter: `${country}, ${city}`,
              balloonContentBody: `${e.title} <b>${
                e.price
              }$</b> <br/> <a href="/${e._id}" data-value="${
                e._id
              }" class="ballon-btn"> Подробнее</a>`,
              balloonContentHeader: `${e.title}`,
              balloonContent: `${e.title} <b>${e.price}$</b>`,
              hintContent: `${e.price}$`,
              clusterCaption: `Предложение <strong>${id}</strong>`,
              _id: e._id
            },
            geometry: {
              type: "Point",
              coordinates: e.chords
            }
          };
        });
        let objects = this.ymaps.geoQuery({
          type: "FeatureCollection",
          features: elem
        });
        objects.addEvents(["click", "balloonopen"], e => {
          let el = e.get("target");
          this.addEvents();
        });
        if (this.polygon) {
          let Mascoords = this.polygon.geometry.coordinates;
          let ListPolygons = [];
          Mascoords.forEach(polCorr => {
            let coords = polCorr;
            /**Разварот координат */
            coords = coords.map(el => {
              return [el[1], el[0]];
            });
            let pol = new this.ymaps.Polygon(
              [coords, 1000],
              {
                hintContent: this.polygon.properties.name
              },
              {
                fillColor: "#6699ff",
                interactivityModel: "default#transparent",
                strokeWidth: 1,
                opacity: 0.4
              }
            );
            ListPolygons.push(pol);
            this.map.geoObjects.add(pol);
          });
          ListPolygons.forEach(pol => {
            let inPol = objects.searchInside(pol);
            this.map.geoObjects.add(
              inPol.search('geometry.type == "Point"').clusterize()
            );
          });
        } else {
          this.map.geoObjects.add(
            objects.search('geometry.type == "Point"').clusterize()
          );
        }
        console.log("this.map.geoObjects", this.map.geoObjects);
        if (this.map.geoObjects) {
          this.map.setBounds(this.map.geoObjects.getBounds());
        }
      }
    },
    OSME() {}
  }
};
let a = document.querySelectorAll(".go");
console.log(a);
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

