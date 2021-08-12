<template>
<div class="data-bar">
  <data-item>
    <template v-slot:title>
      <i class="iconfont icon-fensi1" style="color:#d81e06;"></i>
      粉丝数
      <el-tooltip content="粉丝有点少哦~努力创作吧！" placement="top" effect="light">
      <i class="iconfont icon-wenti"></i>
      </el-tooltip>
    </template>
    <template v-slot:data>{{ follow.num }}</template>
    <template v-slot:tip>
      <i :class="getTrend(follow.change)"
      :style='{color:getTrendColor(follow.change),fontSize:"10px"}'></i>
      {{ getChange(follow.change) }}
    </template>
  </data-item>
  <data-item>
    <template v-slot:title>
      <i class="iconfont icon-bofang" style="color:#3889ff;"></i>
      总阅读/播放量
    </template>
    <template v-slot:data>{{ plays.num }}</template>
    <template v-slot:tip>
      <i :class="getTrend(plays.change)"
      :style='{color:getTrendColor(plays.change),fontSize:"10px"}'></i>
      {{ getChange(plays.change) }}
    </template>
  </data-item>
  <data-item :showIncome='showIncome'>
    <template v-slot:title>
      <i class="iconfont icon-shouyi" style="color:#f5c24c;"></i>
      累计收益
      <i class="iconfont icon-kanjian"
      @click="showIncome=!showIncome"
      style="cursor:pointer"
      v-if="showIncome"></i>
      <i class="iconfont icon-biyan"
      @click="showIncome=!showIncome"
      style="cursor:pointer"
      v-else></i>
    </template>
    <template v-slot:data>{{ income.num }}￥</template>
    <template v-slot:tip>
      <i :class="getTrend(income.change)"
      :style='{color:getTrendColor(income.change),fontSize:"10px"}'></i>
      {{ getChange(income.change) }}
    </template>
  </data-item>
</div>
</template>

<script>
import DataItem from './DataItem.vue'

export default {
  name: 'DataBar',
  components: {
    DataItem
  },
  data() {
    return {
      showIncome: true,
      follow: {
        num: 12,
        change: -1
      },
      plays: {
        num: 1788,
        change: 238
      },
      income: {
        num: 1.33,
        change: 0
      }
    }
  },
  methods: {
    getChange(val) {
      if (val > 0) return `+${val}`
      if (val < 0) return val
      return '昨日无变化'
    },
    getTrend(val) {
      if (val > 0) return 'iconfont icon-shengjiangjiantou_huaban1'
      if (val < 0) return 'iconfont icon-xiajiang'
      return 'iconfont icon-bubian'
    },
    getTrendColor(val) {
      if (val > 0) return '#31ee0b'
      if (val < 0) return '#f51c1c'
      return '#999999'
    },
    hidden() {
      this.income.num = 111
    }
  }
}
</script>

<style lang="scss" scoped>
.data-bar {
  display: flex;
}
</style>
