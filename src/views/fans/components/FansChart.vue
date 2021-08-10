<template>
  <div>
    <!-- 1.为 ECharts 准备一个具备确定大小的画布容器 -->
     <div ref="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 2. 引入 echarts
import * as echarts from 'echarts'

export default {
  name: 'FansChart',
  mounted() {
    // 3. 基于准备好的 dom，初始化 echarts 实例
    const myChart = echarts.init(this.$refs.main)

    // 4. 指定图表的配置项和数据
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 5. 使用刚指定的配置项和数据显示图表
    myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>

</style>
