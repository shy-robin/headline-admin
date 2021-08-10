<template>
  <div class="fans-list-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in 24" :key="index"
        :lg="3" :md="4" :sm="6" :xs="8"
      >
        <div class="fans-container">
          <el-avatar
            :size="70"
            :src="url"
            shape="circle"
            fit="cover"
          ></el-avatar>
          <span>{{ name }}</span>
          <el-button
            icon="el-icon-plus"
            size="mini"
          >关注</el-button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
// import { getFansList } from 'api/fans.js'

export default {
  name: 'FansList',
  data() {
    return {
      perPage: 20, // 每页数量
      name: '这里有七个字符',
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  created() {
    // this.loadFansList(1)
  },
  methods: {
    // async loadFansList(page) {
    //   const res = await getFansList({
    //     page,
    //     per_page: this.perPage
    //   })
    //   console.log(res)
    // }
  }
}
</script>

<style lang="scss" scoped>
.fans-list-container {
  .fans-container {
    height: 130px;
    font-size: 12px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid rgb(226, 226, 226);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
