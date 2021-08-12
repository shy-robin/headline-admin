<template>
<el-card class="box-card">
  <div class="show-data">
    <data-bar></data-bar>
  </div>
  <div class="publish">
    <time-line></time-line>
  </div>
</el-card>
</template>

<script>
import DataBar from '../common/databar/DataBar.vue'
import TimeLine from '../common/timeline/TimeLine.vue'

export default {
  name: 'History',
  components: {
    DataBar,
    TimeLine
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  height: 528px;
  .publish {
    padding-top: 40px;
  }
}
</style>
