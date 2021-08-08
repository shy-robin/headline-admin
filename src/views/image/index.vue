<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-radio-group
        v-model="isCollect"
        size="mini"
        @change='onLabelChange'
      >
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in imageList" :key="index"
          class="image"
          :lg="4" :md="6" :sm="8" :xs="12"
        >
          <el-image
            :src="item.url"
            :preview-src-list="[item.url]"
            fit="cover"
            lazy
          ></el-image>
        </el-col>
      </el-row>
      <el-pagination
        class="pagination"
        background
        :current-page.sync="page"
        @current-change="loadImageList(page)"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getImageList } from 'api/image.js'

export default {
  name: 'ImageIndex',
  data() {
    return {
      isCollect: false, // 默认显示全部图片
      perPage: 10, // 默认每页请求 10 张
      imageList: [], // 图片列表
      totalCount: 0, // 图片总数
      page: 1 // 当前第几页，默认为第 1 页
    }
  },
  created() {
    this.loadImageList()
  },
  methods: {
    async loadImageList(page) {
      try {
        const res = await getImageList({
          page,
          collect: this.isCollect,
          per_page: this.perPage
        })
        const { results: imageList, total_count: totalCount } = res.data.data
        this.imageList = imageList
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    },
    onLabelChange(isCollect) {
      this.isCollect = isCollect
      this.loadImageList(this.page)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  .image {
    padding-top: 10px;
  }
  .pagination {
    padding-top: 10px;
  }
}
</style>
