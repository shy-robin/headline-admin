<template>
  <div class="fans-list-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in fansList" :key="index"
        :lg="3" :md="4" :sm="6" :xs="8"
      >
        <div class="fans-container">
          <el-avatar
            :size="70"
            :src="item.photo"
            shape="circle"
            fit="cover"
          ></el-avatar>
          <span>{{ item.name }}</span>
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
      :total="totalCount"
      :current-page.sync="page"
      @current-change="loadFansList(page)"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getFansList } from 'api/fans.js'

export default {
  name: 'FansList',
  data() {
    return {
      perPage: 24, // 每页数量
      fansList: [], // 粉丝列表
      totalCount: 0, // 粉丝总数
      page: 1 // 当前页码
    }
  },
  created() {
    this.loadFansList(1)
  },
  methods: {
    async loadFansList(page) {
      try {
        const res = await getFansList({
          page,
          per_page: this.perPage
        })
        const { results: fansList, total_count: totalCount } = res.data.data
        this.fansList = fansList
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    }
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
