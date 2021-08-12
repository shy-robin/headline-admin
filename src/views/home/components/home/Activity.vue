<template>
<el-card class="activity">
  <el-carousel :height='bannerHeight'>
    <el-carousel-item v-for="(item,index) in imgURL" :key="index">
      <img
      style="width:100%"
      :src='item'
      ref='bannerImg'
      @load='imgLoad'>
    </el-carousel-item>
  </el-carousel>
  <card-header class="header">
    <template slot='title'>为您推荐以下创作活动</template>
  </card-header>
  <el-row v-for="(k,kIndex) in 3" :key="kIndex" :gutter="20">
    <el-col :span="12" v-for="(item, index) in activity.slice(kIndex*2,kIndex*2+2)" :key="index">
      <activity-card>
        <template v-slot:title>{{ item.title }}</template>
        <template v-slot:content>{{ item.content }}</template>
        <template v-slot:prize>{{ item.prize }}</template>
        <template v-slot:num>{{ item.num }}</template>
      </activity-card>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
/* eslint-disable */
import CardHeader from '../common/cardheader/CardHeader.vue'
import ActivityCard from '../common/activitycard/ActivityCard.vue'

export default {
  name: 'Activity',
  components: {
    CardHeader,
    ActivityCard,
  },
  data() {
    return {
      bannerHeight: '',
      imgURL: [
        'https://gitee.com/gainmore/imglib/raw/master/img/banner1.jpg',
        'https://gitee.com/gainmore/imglib/raw/master/img/banner1.jpg',
        'https://gitee.com/gainmore/imglib/raw/master/img/banner1.jpg',
      ],
      activity: [
        {
          title: '中国妈妈Young',
          content: '分享妈妈的精彩生活，瓜分丰厚奖励！',
          prize: '1.6万',
          num: '1.2万',
        },
        {
          title: '高血压离你有多远',
          content: '参与科普创作，瓜分现金大奖！',
          prize: '3900',
          num: '763',
        },
        {
          title: '闪亮的坐标',
          content: '分享英雄故事，致敬闪亮的坐标',
          prize: '3000',
          num: '316',
        },
        {
          title: '懂球大会',
          content: '参与话题活动，赢千元现金大奖，中超签名照及NBA周边奖品',
          prize: '9000',
          num: '5.7万',
        },
        {
          title: '高考真题大盘点',
          content: '盘点你做过的高考真题，赢取现金奖励哦~',
          prize: '2400',
          num: '30',
        },
        {
          title: '理想照耀中国征文',
          content: '电视剧《理想照耀中国》征文活动上线，参与征文分享你的观后感',
          prize: '5万',
          num: '266',
        },
      ],
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.bannerHeight = `${this.$refs.bannerImg[0].height}px`
    }, false)
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = `${this.$refs.bannerImg[0].height}px`
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.activity {
  .header {
    padding-top: 40px;
  }
}
::v-deep .el-card__body {
  height: 660px;
}
</style>
