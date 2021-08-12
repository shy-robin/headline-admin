<template>
  <el-container class="layout-container">
    <el-aside class="aside" width='auto'>
      <layout-aside class="layout-aside" />
    </el-aside>
    <el-container>
      <el-header class="header" :style="{backgroundColor:themeColor}">
        <layout-header class="layout-header" />
      </el-header>
      <el-main>
        <!-- 嵌套路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './components/LayoutAside.vue'
import LayoutHeader from './components/LayoutHeader.vue'

export default {
  name: 'LayoutIndex',
  components: {
    LayoutAside,
    LayoutHeader
  },
  data() {
    return {
      themeColor: '#545c64'
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .aside {
    .layout-aside {
      height: 100%;
      border-right: none;
    }
  }
  .header {
    .layout-header {
      height: 100%;
    }
  }
}
</style>
