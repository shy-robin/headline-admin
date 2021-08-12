<template>
<el-card class="card">
  <div class="left">
    <div class="img">
      <el-image
      v-if="imgURL"
      :src='imgURL'
      style="width:46px;height:46px;border-radius:5px;"
      fit='cover'
      ></el-image>
    </div>
    <div class="preview-text single-line-ellipsis">
      <slot name="preview"></slot>
    </div>
  </div>
  <div class="right">
    <div class="right-item">
      <span class="count"><slot name="displayNum"></slot></span>
      <span class="label">展现量</span>
    </div>
    <div class="right-item">
      <span class="count"><slot name="readNum"></slot></span>
      <span class="label">阅读量</span>
    </div>
    <div class="right-item">
      <span class="count"><slot name="commentNum"></slot></span>
      <span class="label">评论</span>
    </div>
    <div class="right-item">
      <span class="count"><slot name="likesNum"></slot></span>
      <span class="label">点赞</span>
    </div>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'ShowBar',
  props: {
    imgURL: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  display: flex;
  height: 46px;
  padding: 10px;
  .left {
    background-color: rgba(131, 131, 131, 0.1);
    border-radius: 5px;
    overflow: hidden; // 注意，这里也需要设置隐藏溢出，否则会布局混乱
    line-height: 46px;
    display: flex;
    flex: 1;
  }
  .right {
    display: flex;
    flex: 1;
    .right-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-align: center;
      .count {
        flex: 1;
        line-height: 23px;
        font-weight: bold;
      }
      .label {
        flex: 1;
        line-height: 23px;
        font-size: 12px;
      }
    }
  }
}
</style>
