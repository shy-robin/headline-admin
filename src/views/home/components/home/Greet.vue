<template>
<el-card class="box-card">
  <div class="title">
    <span
    class="greeting single-line-ellipsis"
    style="line-height:40px">{{ time }}好，<strong>{{ username }}</strong>!</span>
    <span
    class="single-line-ellipsis"
    style="line-height:40px">今天是您在 <strong>闪电号</strong> 创作的第{{ day }}天</span>
  </div>
  <div class="info">
    <div class="info-item single-line-ellipsis">
      <i class="iconfont icon-quanyi" style="color:#ffa73e"></i>
      <span slot="title">文章原创、视频创作收益等 {{ rights }} 项权益</span>
    </div>
    <div class="info-item single-line-ellipsis">
      <i class="iconfont icon-xinyongcopybeifen" style="color:#f2bf95"></i>
      <span slot="title">信用分 {{ credit }}分</span>
    </div>
    <div class="info-item single-line-ellipsis">
      <i class="iconfont icon-renzheng" :style="{color:isAuth? '#169e5c':'e8e8e8'}"></i>
      <span slot="title">闪电认证
        <span
        style="font-size:12px;background-color:#f5f5f5;padding:0 5px;"
        >{{ isAuth ? '已认证' : '未认证'}}</span>
      </span>
    </div>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'Greet',
  data() {
    return {
      time: '晚上',
      username: '闪电创作者',
      day: 999,
      rights: 4,
      credit: 100,
      isAuth: true
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  .title {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    .greeting {
      font-size: 20px;
    }
  }
  .info {
    .info-item {
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      i {
        margin-right: 10px;
      }
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
