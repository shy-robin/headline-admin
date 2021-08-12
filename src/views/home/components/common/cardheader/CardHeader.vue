<template>
<div class="header">
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="more">
    <span>更多<i class="iconfont icon-gengduo"></i></span>
  </div>
</div>
</template>

<script>
export default {
  name: 'CardHeader'
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  .title {
    font-size: 20px;
  }
  .more {
    line-height: 26px;
    font-size: 14px;
    color: #999;
  }
}
</style>
