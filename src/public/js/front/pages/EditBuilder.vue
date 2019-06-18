<template lang="pug">
    .container 
        p Edit {{$route.params.id}}
        createBuild(:value="$route.params.id")
</template>
<script>
import createBuild from "./../components/createBuild.vue";
export default {
  components: {
    createBuild
  }
};
</script>

