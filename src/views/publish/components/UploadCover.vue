<template>
  <div class="upload-cover-container">
    <div
      class="avatar-uploader"
      @click="onUploadCover"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <el-dialog
      title="选择封面"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="素材库" name="lib">
          <el-radio-group
            v-model="isCollect"
            size="mini"
            @change='onLabelChange'
          >
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-row :gutter="20" style="margin:10px 0;">
            <el-col
              v-for="(item, index) in imageList" :key="index"
              class="image-container"
              :span="6"
            >
            <div class="image-wrapper">
              <el-image
                class="image"
                style="height:140px;width:100%"
                :src="item.url"
                :preview-src-list="[item.url]"
                fit="fill"
                lazy
              ></el-image>
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">配置管理</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getImageList } from 'api/image.js'

export default {
  name: 'UploadCover',
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      activeTab: 'lib',
      isCollect: false,
      perPage: 8,
      page: 1,
      totalCount: 0,
      imageList: []
    }
  },
  methods: {
    onUploadCover() {
      this.loadImageList(1)
      this.dialogVisible = true
    },
    async loadImageList(page) {
      try {
        const res = await getImageList({
          page,
          collect: this.isCollect,
          per_page: this.perPage
        })
        const { results: imageList, total_count: totalCount } = res.data.data
        imageList.forEach(item => { // 给每张图片都添加一个 isLoading 属性
          item.isLoading = false
        })
        this.imageList = imageList
        this.totalCount = totalCount
      } catch (ex) {
        console.log(ex)
      }
    },
    onLabelChange(isCollect) {
      this.isCollect = isCollect
      this.loadImageList(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-cover-container {
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    margin-right: 20px;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
}
</style>
