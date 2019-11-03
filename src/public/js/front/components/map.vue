<template lang="pug">
		.map
			#map(v-if="scriptLoaded")
</template>
<script>
import { Promise } from "q";
import osme from "osme";
export default {
	props: [
		"value",
		"builds",
		"address",
		"osme",
		"polygon",
		"workCircleData",
		"isWorkCircle"
	],
	data() {
		return {
			scriptLoaded: false,
			map: null,
			ymaps: null,
			activeRoute: null,
			workCoords: [0, 0]
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
				return [];
			}
		},
		addressComp() {
			return this.address;
		},
		osmeComp() {
			if (this.osme) {
				return this.osme;
			}
			return [];
		}
	},
	watch: {
		addressComp() {
			this.sendCoords();

			this.getCoordinates()
				.then(data => {
					this.setPoint(data);
				})
				.catch(() => {});
		},
		items() {
			this.setPoints();
		},
		osmeComp() {
			this.OSME();
		},
		polygon() {
			this.setPoints();
		},
		workCircleData() {
			this.setPoints();
		},
		isWorkCircle() {
			this.workCoords = this.map.getCenter();
			this.setPoints();
		}
	},
	created() {},
	beforeDestroy() {
		this.map.geoObjects.removeAll();
	},
	mounted() {
		var self = this;

		this.scriptLoaded = true;
		let center = [0, 0];
		if (this.builds && this.builds.length == 1) {
			center = this.builds[0].chords;
		}
		this.$ymaps.ready(() => {
			this.map = new this.$ymaps.Map(
				"map",
				{
					center: center,
					zoom: 5
				},
				{
					//searchControlProvider: "yandex#search"
				}
			);

			/*	this.getCoordinates()
				.then(data => {
					this.setPoint(data);
				})
				.catch(() => {});
*/
			this.setPoints();
			// this.multiRoute();
		});
	},
	methods: {
		setPoint(c) {
			this.map.geoObjects.removeAll();
			this.map.setCenter(c);
			this.map.setZoom(17);
			var myPlacemark = new this.$ymaps.Placemark(c, {}, {});
			this.map.geoObjects.add(myPlacemark);
		},
		getCoordinates() {
			return new Promise((resolve, rej) => {
				if (this.$ymaps) {
					let coords = this.$ymaps.geocode(this.addressComp);
					coords.then(
						res => {
							let val = res.geoObjects
								.get(0)
								.geometry.getCoordinates();
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
		workPointCreate() {
			const work = new ymaps.Placemark(
				this.workCoords,
				{},
				{ draggable: true }
			);
			work.events.add("dragend", () => {
				this.workCoords = work.geometry.getCoordinates();
				this.setPoints();
			});
			this.map.geoObjects.add(work);
		},
		setPoints() {
			if (this.items && this.map) {
				this.map.geoObjects.removeAll();
				let clusterer = new this.$ymaps.Clusterer({
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
					let preset = "islands#blueStretchyIcon";
					switch (e.countroom) {
						case 1:
							preset = "islands#darkGreenStretchyIcon";
							break;
						case 2:
							preset = "islands#orangeStretchyIcon";
						case 3:
							preset = "islands#redStretchyIcon";
					}
					if (e.type === "room") {
						preset = "islands#blueStretchyIcon";
					}
					let img = e.photo.length
						? `<img src="${e.photo[0].url}" width="200"/>`
						: "";
					let template = `
						<div class="">${img}
							<div>${e.type_deal === "rent" ? "Аренда" : "Продажа"}</div>
							<div><b>$ ${e.price}</b></div>
							<a href="/${e._id}" data-value="${e._id}" class="ballon-btn"> Подробнее</a>
						</div>`;
					return {
						type: "Feature",
						properties: {
							balloonContentFooter: `${country}, ${city}`,
							balloonContentBody: template,
							balloonContentHeader: `${e.title}`,
							balloonContent: `${e.title} <b>${e.price}$</b>`,
							hintContent: `$ ${e.price}`,
							clusterCaption: `Предложение <strong>${id}</strong>`,
							_id: e._id,
							iconContent: `$${e.price}`
						},
						geometry: {
							type: "Point",
							coordinates: e.chords
						},
						options: {
							preset: preset
						}
					};
				});

				let objects = this.$ymaps.geoQuery({
					type: "FeatureCollection",
					features: elem
				});

				objects.addEvents(["balloonopen"], e => {
					let el = e.get("target");
					this.addEvents();
				});

				const circle = new this.$ymaps.Circle(
					[this.workCoords, this.workCircleData.size],
					{},
					{ fill: false, strokeColor: "#ff4c00" }
				);
				if (this.isWorkCircle) {
					objects.addEvents(["click"], e => {
						this.multiRoute(
							e.originalEvent.target.geometry.getCoordinates()
						);
					});
					this.workPointCreate();
					this.map.geoObjects.add(circle);
				}
				if (this.polygon && this.polygon.geometry) {
					let Mascoords = this.polygon.geometry.coordinates;
					let ListPolygons = [];
					Mascoords.forEach(polCorr => {
						let coords = polCorr;
						coords = coords.map(el => {
							return [el[1], el[0]];
						});
						let pol = new this.$ymaps.Polygon(
							[coords, 1000],
							{
								hintContent: this.polygon.properties.name
							},
							{
								fill: false,
								fillColor: "#6699ff",
								interactivityModel: "default#transparent",
								strokeWidth: 1,
								opacity: 1
							}
						);
						ListPolygons.push(pol);
						this.map.geoObjects.add(pol);
					});

					ListPolygons.forEach(pol => {
						let inPol = objects.searchInside(pol);
						if (this.isWorkCircle) {
							inPol = objects.searchInside(circle);
						}
						this.map.geoObjects.add(
							inPol
								.search('geometry.type == "Point"')
								.clusterize()
						);
					});
				} else {
					if (this.isWorkCircle) {
						objects = objects.searchInside(circle);
					}
					this.map.geoObjects.add(
						objects.search('geometry.type == "Point"').clusterize()
					);
				}

				if (this.map.geoObjects) {
					if (this.map.geoObjects.getBounds()) {
						this.map.setBounds(this.map.geoObjects.getBounds());

						let zoom = this.map.action.getCurrentState().zoom;

						this.map.setZoom(zoom > 18 ? 18 : zoom);
					} else {
						this.map.setZoom(5);
					}
				}
			}
		},
		OSME() {},
		getRoute(point) {
			return this.$ymaps.route([point, "minsk"], {
				multiRoute: false
			});
		},
		multiRoute(point) {
			this.map.geoObjects.remove(this.activeRoute);
			this.activeRoute = new this.$ymaps.multiRouter.MultiRoute(
				{
					referencePoints: [point, this.workCoords],
					params: {
						results: 1
					}
				},
				{
					boundsAutoApply: true
				}
			);
			this.map.geoObjects.add(this.activeRoute);
		}
	}
};
let a = document.querySelectorAll(".go");
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

