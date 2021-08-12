<template>
<el-card class="recommend-card">
  <card-header>
    <template v-slot:title>推荐课程</template>
  </card-header>
  <video-item v-for="(item, index) in list" :key="index">
    <template v-slot:image>
      <img :src="item.imgURL" alt="">
    </template>
    <template v-slot:time>{{ item.time }}</template>
    <template v-slot:title>{{ item.title }}</template>
    <template v-slot:views>{{ item.views }}万播放量</template>
  </video-item>
</el-card>
</template>

<script>
/* eslint-disable */
import CardHeader from '../common/cardheader/CardHeader.vue'
import VideoItem from '../common/videoitem/VideoItem.vue'

export default {
  name: 'Recommend',
  components: {
    CardHeader,
    VideoItem,
  },
  data() {
    return {
      list: [
        {
          title: '3分钟掌握如何发布图文内容',
          views: '98.2',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '03:33',
        },
        {
          title: '3分钟教你注册头条号',
          views: '44.9',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '03:03',
        },
        {
          title: '官方解读，如何更好获得头条推荐',
          views: '13.8',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '06:13',
        },
        {
          title: '5分钟了解今日头条内容推荐机制',
          views: '48.5',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '04:55',
        },
        {
          title: '一节课带你了解头条审核红线',
          views: '5.2',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '08:24',
        },
        {
          title: '一节课带你了解头条审核红线',
          views: '5.2',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/videoimg.jpeg',
          time: '08:24',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.recommend-card {
  ::v-deep .el-card__body {
    height: 660px;
  }
}
</style>
