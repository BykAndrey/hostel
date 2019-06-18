<template>
  <label class="check">
    <input type="checkbox" :value="value" @change="$emit('input',$event.target.checked?true:false)">
    <span class="check__body">
      <span class="check__box"></span>
      <span class="check__label">
        <slot/>
      </span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.check {
  display: block;
  margin-bottom: 10px;
  input {
    display: none;
  }
  input:checked + &__body > &__box:after {
    opacity: 1;
  }
  &__body {
    display: flex;
    align-items: center;
  }
  &__box {
    display: block;
    height: 20px;
    width: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5%;
    position: relative;
    margin-right: 20px;
    &:after {
      display: block;
      position: absolute;
      opacity: 0;
      height: 70%;
      width: 70%;
      content: "";
      background: rgba(16, 90, 109, 0.5);
      border-radius: 5%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transition-duration: 0.3s;
    }
  }
}
</style>

