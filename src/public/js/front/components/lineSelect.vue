<template lang="pug">
	.line-select
		div(:class="'el ' + (value=='all' ? ' active' : '')" @click="send('all')") Все
		div(:class="'el ' + (value=='1' ? ' active' : '')" @click="send('1')") 1
		div(:class="'el ' + (value=='2' ? ' active' : '')" @click="send('2')") 2
		div(:class="'el ' + (value=='3' ? ' active' : '')" @click="send('3')") 3
		div(:class="'el ' + (value=='4+' ? ' active' : '')" @click="send('4+')") 4+
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "all"
    }
  },
  methods: {
    send(val) {
      this.$emit("input", val);
    }
  }
};
</script>
<style lang="scss">
@import "./../../../css/config.scss";
.line-select {
  display: flex;
  border: 1px solid $color;
  .el {
    flex: 1 1 auto;
    text-align: center;
    background: $color;
    color: white;
    font-size: 14px;
    padding: 5px 0;
    cursor: pointer;
    transition-duration: 0.5s;
    &.active {
      background: white;
      color: $color;
    }
  }
}
</style>
