<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="200px"
    >侧边栏</el-aside>
    <el-container>
      <el-header
        class="header"
      >顶部栏</el-header>
      <el-main>
        <!-- 嵌套路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'LayoutIndex'
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
    background-color: red;
  }
  .header {
    background-color: green;
  }
}
</style>
