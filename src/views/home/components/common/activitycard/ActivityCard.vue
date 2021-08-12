<template>
<el-card class="box-card">
  <div class="title single-line-ellipsis">
    <slot name="title"></slot>
  </div>
  <div class="content multi-line-ellipsis">
    <slot name="content"></slot>
  </div>
  <div class="footer single-line-ellipsis">
    <span>
      奖金总额
      <slot name="prize"></slot>元
    </span>
    |
    <span>
      <slot name="num"></slot>人参加
    </span>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'ActivityCard'
}
</script>

<style lang="scss" scoped>
.box-card {
  ::v-deep .el-card__body {
    display: flex;
    flex-direction: column;
    height: 100px;
    .title {
      font-weight: bold;
      flex-basis: 21px;
      padding-bottom: 10px;
    }
    .content {
      color: #666;
      font-size: 14px;
      height: 40px;
    }
    .footer {
      font-size: 14px;
      flex-basis: 19px;
      padding-top: 10px;
    }
  }
}
</style>
