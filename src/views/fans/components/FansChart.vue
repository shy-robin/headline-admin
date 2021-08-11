<template>
  <div>
    <!-- 1.为 ECharts 准备一个具备确定大小的画布容器 -->
     <div ref="gender" style="width: 600px;height:400px;"></div>
     <div ref="age" style="width: 600px;height:400px;"></div>
     <div ref="device" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
// 2. 引入 echarts
import * as echarts from 'echarts'
import { getFansStatistic } from 'api/fans.js'

export default {
  name: 'FansChart',
  data() {
    return {
      statistic: {} // 统计数据
    }
  },
  created() {
    this.loadFansStatistic()
  },
  mounted() {
    // 3. 基于准备好的 dom，初始化 echarts 实例
    const genderPie = echarts.init(this.$refs.gender)
    const agePie = echarts.init(this.$refs.age)
    const devicePie = echarts.init(this.$refs.device)

    // 4. 指定图表的配置项和数据
    const genderData = {
      title: {
        text: '粉丝男女比例',
        subtext: '模拟数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 536, name: '男性' },
            { value: 464, name: '女性' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const ageData = {
      title: {
        text: '粉丝年龄分布',
        subtext: '模拟数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 101, name: '0-18' },
            { value: 353, name: '19-23' },
            { value: 400, name: '24-30' },
            { value: 121, name: '31-40' },
            { value: 15, name: '41-50' },
            { value: 10, name: '50+' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const deviceData = {
      title: {
        text: '粉丝设备分布',
        subtext: '模拟数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 210, name: 'iOS' },
            { value: 790, name: 'Android' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    // 5. 使用刚指定的配置项和数据显示图表
    genderPie.setOption(genderData)
    agePie.setOption(ageData)
    devicePie.setOption(deviceData)
  },
  methods: {
    async loadFansStatistic() {
      const res = await getFansStatistic()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
