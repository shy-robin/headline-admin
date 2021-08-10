<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs
        v-model="activeTab"
        type="card"
      >
        <el-tab-pane label="粉丝列表" name="list">
          <fans-list></fans-list>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="chart">
          <fans-chart></fans-chart>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FansList from './components/FansList.vue'
import FansChart from './components/FansChart.vue'

export default {
  name: 'FansIndex',
  components: {
    FansList,
    FansChart
  },
  data() {
    return {
      activeTab: 'list'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
