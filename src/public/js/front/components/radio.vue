<template>
  <label class="radio">
    <input
      type="radio"
      :name="name"
      :value="val"
      @change="$emit('input',val)"
      :checked="value==val?true:false"
    >
    <span class="radio__body">
      <span class="radio__box"></span>
      <span class="radio__label">{{ title }}</span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    val: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.radio {
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
    border-radius: 100%;
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
      border-radius: 100%;
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

