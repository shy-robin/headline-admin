<template>
<div class="video-item">
  <div class="left">
    <div class="image">
      <slot name="image"></slot>
      <div class="time">
        <slot name="time" class="time"></slot>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="title multi-line-ellipsis">
      <slot name="title"></slot>
    </div>
    <div class="views single-line-ellipsis">
      <slot name="views"></slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'VideoItem'
}
</script>

<style lang="scss" scoped>
.video-item {
  display: flex;
  height: 85px;
  padding: 5px 0;
  .left {
    width: 150px;
    position: relative;
    .image {
      img {
        width: 100%;
        border-radius: 5px;
      }
      .time {
        position: absolute;
        color: #fff;
        font-size: 12px;
        background-color: rgba(0, 0, 0, .4);
        width: 45px;
        border-radius: 10px;
        text-align: center;
        bottom: 5px;
        right: 5px;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding-left: 10px;
    .title {
      height: 40px;
    }
    .views {
      color: #666;
      font-size: 12px;
    }
  }
}
</style>
