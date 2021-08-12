<template>
<div class="container">
  <div class="top-container">
    <div class="left">
      <history></history>
    </div>
    <div class="right">
      <greet></greet>
      <inspiration></inspiration>
    </div>
  </div>
  <div class="bottom-container">
    <div class="left">
      <activity></activity>
    </div>
    <div class="right">
      <recommend></recommend>
    </div>
  </div>
</div>
</template>

<script>
import History from './components/home/History.vue'
import Greet from './components/home/Greet.vue'
import Inspiration from './components/home/Inspiration.vue'
import Activity from './components/home/Activity.vue'
import Recommend from './components/home/Recommend.vue'

export default {
  name: 'HomeIndex',
  components: {
    History,
    Greet,
    Inspiration,
    Activity,
    Recommend
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%; // 注意，一定要设置宽度，否则会元素宽度超过父元素会导致布局混乱
    height: 3000px; // 必须设置高度，否则垂直方向会变成响应式
    display: flex;
    flex-direction: column;
    .top-container {
      margin-top: 24px;
      margin-left: 24px;
      margin-right: 60px;
      height: 528px;
      display: flex;
      .left {
        width: 55vw;
        margin-right: 28px;
      }
      .right {
        width: 28vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .bottom-container {
      margin-top: 24px;
      margin-left: 24px;
      margin-right: 60px;
      height: 710px;
      display: flex;
      .left {
        width: 55vw;
        margin-right: 28px;
      }
      .right {
        width: 28vw;
        height: 100%;
      }
    }
  }
</style>
