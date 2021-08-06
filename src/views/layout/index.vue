<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <layout-aside class="layout-aside" />
    </el-aside>
    <el-container>
      <el-header class="header">
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
    }
  }
  .header {
    border-bottom: 1px solid rgb(231, 231, 231);
    .layout-header {
      height: 100%;
    }
  }
}
</style>
