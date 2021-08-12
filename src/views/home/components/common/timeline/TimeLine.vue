<template>
<div>
  <el-timeline>
    <el-timeline-item
    v-for="(item,index) in publish"
    :key='index'
    :timestamp='item.timestamp'
    placement="top">
      <show-bar :imgURL='item.imgURL'>
        <template v-slot:preview>{{ item.content }}</template>
        <template v-slot:displayNum>{{ item.displayNum }}</template>
        <template v-slot:readNum>{{ item.readNum }}</template>
        <template v-slot:commentNum>{{ item.commentNum }}</template>
        <template v-slot:likesNum>{{ item.likesNum }}</template>
      </show-bar>
    </el-timeline-item>
    <el-timeline-item style="cursor:pointer;">
      <span style="fontSize:12px;color:#999;">查看更多作品</span>
      <i class="iconfont icon-gengduo" style="fontSize:12px;color:#999;"></i>
    </el-timeline-item>
  </el-timeline>
</div>
</template>

<script>
import ShowBar from './ShowBar.vue'

export default {
  name: 'TimeLine',
  data() {
    return {
      publish: [
        {
          timestamp: '2019-08-11 09:33 回答了问题',
          type: '问题',
          displayNum: 1232,
          readNum: 342,
          commentNum: 2,
          likesNum: 1,
          content: '本老汉在职时，曾听到有女同事议论说男生170㎝0以下身高为二等残废，可见在她们心目中170以下的男生显然属于身材矮小之列。一般招聘女公关或模特都得172㎝身高，本题我觉得有175㎝身高的男生就应该入得了她们的法眼。即可以说175㎝身高的男生就不算矮！'
        },
        {
          timestamp: '2019-08-07 09:33 发布了文章',
          type: '文章',
          displayNum: 3422,
          readNum: 531,
          commentNum: 12,
          likesNum: 12,
          content: '有这样一部电影，能让你宁愿活在梦里，也不愿醒来',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/1.png'
        },
        {
          timestamp: '2019-08-06 09:33 发布了文章',
          type: '文章',
          displayNum: 2274,
          readNum: 123,
          commentNum: 2,
          likesNum: 0,
          content: '《怦然心动》不仅是一部青春纯爱电影，更是一部家庭教育大片',
          imgURL: 'https://gitee.com/gainmore/imglib/raw/master/img/2.png'
        }
      ]
    }
  },
  components: {
    ShowBar
  }
}
</script>

<style lang="scss" scoped>

</style>
