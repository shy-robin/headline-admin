<template>
  <el-menu
    :default-active="$route.path"
    :background-color="themeColor"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse='isCollapse'
  >
    <div class="logo">
      <span v-if=!isCollapse @click="$router.push('/')">闪电号</span>
      <span
        v-else
        @click="$router.push('/')"
      ><img src="headlines.svg" alt=""></span>
    </div>
    <el-menu-item index="/">
      <i class="iconfont icon-index-copy"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="iconfont icon-neirong"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-sucai"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-fabu"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-retouch"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fensi"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/setting">
      <i class="iconfont icon-shezhi"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import EventBus from 'utils/bus.js'

export default {
  name: 'LayoutAside',
  data() {
    return {
      isCollapse: false,
      themeColor: '#545c64'
    }
  },
  created() {
    EventBus.$on('foldMenu', () => {
      this.isCollapse = !this.isCollapse
    })
  }
}
</script>

<style lang="scss" scoped>
.logo {
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  font-family: 'zihun';
  text-align: center;
  padding: 20px 20px;
  span:hover {
    cursor: pointer;
    color: yellow;
  }
  img {
    width: 20px;
  }
}
.iconfont {
  width: 24px;
  margin-right: 10px;
}
</style>
