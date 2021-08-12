<template>
<el-card class="box-card">
  <card-header class="header">
    <template v-slot:title>创作灵感</template>
  </card-header>
  <div v-for="(item,index) in list" :key="index" class="list">
    <div class="preview single-line-ellipsis">{{ item }}</div>
    <i class="iconfont icon-gengduo" style="line-height:21px;"></i>
  </div>
</el-card>
</template>

<script>
import CardHeader from '../common/cardheader/CardHeader.vue'

export default {
  name: 'Inspiration',
  data() {
    return {
      list: [
        '女生对男生帅气的定义是什么？',
        '你会娶一个初中学历的女生吗？',
        '遇到过最喜欢的男孩是什么感受？',
        '女生来大姨妈时男生的正确处理方式',
        '有一个身高一米五的女朋友是啥体验？'
      ]
    }
  },
  components: {
    CardHeader
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  .list {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
}
</style>
