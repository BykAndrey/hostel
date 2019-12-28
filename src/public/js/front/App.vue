<template lang="pug">
      .wrapper
        v_header
        router-view
        
    </template>
<script>
import v_header from './components/Header.vue';
export default {
	name: 'app',
	components: {
		v_header
	},
	data() {
		return {
			secondLoadCookie: false,
			secondLoadUserData: false
		};
	},
	beforeMount() {
		this.startApp();
	},
	mounted() {},
	methods: {
		startApp() {
			this.$store
				.dispatch('GET_COOKIE')
				.then(e => {
					this.$store
						.dispatch('CHECK_USER')
						.then(() => {
							this.$store.dispatch('GET_PROFILE');
						})
						.catch(() => {
							if (!this.secondLoadUserData) {
                this.secondLoadUserData = true;
								this.startApp();
							}
						});
				})
				.catch(() => {
					if (!this.secondLoadCookie) {
            this.secondLoadCookie=true;
						this.startApp();
					}
				});
			this.$store.dispatch('sessionUser');
		}
	}
};
</script>
<style lang="scss"></style>
