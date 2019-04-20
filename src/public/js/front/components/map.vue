<template lang="pug">
		#map(v-if="scriptLoaded")
</template>
<script>
export default {
	props: ["value","builds"],
	data() {
		return {
			scriptLoaded: false,
			map: undefined
		};
	},
	computed: {
		points() {
			
			return this.value;
		},
		items(){
			if(this.builds !== undefined && this.builds !== null){
				return this.builds;
			}
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
		recaptchaScript.onload = ()=> {
			this.scriptLoaded = true;
			ymaps.ready(()=>{
				
				this.map = new ymaps.Map(
					"map",
					{
						center: this.points[0],
						zoom: 1
					},
					{
						searchControlProvider: "yandex#search"
					}
				);
				this.points.forEach(e => {
					var myPlacemark = new ymaps.Placemark(e, {}, {});
					this.map.geoObjects.add(myPlacemark);
				});
			//	new ymaps.Geocoder("Москва")
				this.items.forEach(e => {
					console.log(e.chords)
					var myPlacemark = new ymaps.Placemark(e.chords, {}, {});
					this.map.geoObjects.add(myPlacemark);
				});
			});
		};
	}
};
</script>
<style lang="scss">
#map {
	height: 300px;
}
</style>

