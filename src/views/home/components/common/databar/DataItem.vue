<template>
<div class="container">
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="data">
    <slot v-if='showIncome' name="data"></slot>
    <span v-else>****</span>
  </div>
  <div class="tip">
    <div class="content">
      <slot v-if="showIncome" name='tip'></slot>
      <span v-else>****</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ShowData',
  data() {
    return {
      isShow: true
    }
  },
  props: {
    showIncome: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  .title {
    flex-basis: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
  .data {
    flex-basis: 60px;
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    font-weight: bold;
  }
  .tip {
    flex-basis: 20px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    .content {
      display: inline-block;
      background-color: rgba(131, 131, 131, 0.1);
      border-radius: 5px;
    }
  }
}
</style>
