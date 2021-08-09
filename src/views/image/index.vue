<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style='display:flex;justify-content:space-between;'>
        <el-radio-group
          v-model="isCollect"
          size="mini"
          @change='onLabelChange'
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          round
          size="mini"
          @click="dialogVisible = true"
        >上传素材</el-button>
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in imageList" :key="index"
          class="image-container"
          :lg="4" :md="6" :sm="8" :xs="12"
        >
        <div class="image-wrapper">
          <el-image
            class="image"
            style="height:150px;width:100%"
            :src="item.url"
            :preview-src-list="[item.url]"
            fit="fill"
            lazy
          ></el-image>
          <div class="image-operation">
            <el-button
              :icon="item.is_collected ?
              'iconfont icon-shoucang2' : 'iconfont icon-shoucang_quxiaoshoucang'"
              circle
              size="mini"
              type="warning"
              :loading="item.isLoading"
              @click="onStar(!item.is_collected, item.id, index)"
            ></el-button>
            <el-button
              icon="iconfont icon-shanchu"
              circle
              type="danger"
              size="mini"
              :loading="item.isLoading"
              @click="onDelete(item.id, index)"
            ></el-button>
          </div>
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
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-upload
        drag
        v-if="dialogVisible"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        :on-error="onUploadError"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传图片格式文件，且图片不能太大！！！</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  getImageList,
  starImage,
  deleteImage
} from 'api/image.js'

export default {
  name: 'ImageIndex',
  data() {
    const token = window.localStorage.getItem('user')

    return {
      isCollect: false, // 默认显示全部图片
      perPage: 12, // 默认每页请求 10 张
      imageList: [], // 图片列表
      totalCount: 0, // 图片总数
      page: 1, // 当前第几页，默认为第 1 页
      dialogVisible: false, // 展示上传图片窗口
      uploadHeaders: { // 图片上传请求头
        Authorization: `Bearer ${token}`
      }
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
    },
    onUploadSuccess() {
      this.dialogVisible = false // 关闭上传窗口
      this.loadImageList(1) // 重新显示图片列表
      this.$msgSuccess('图片上传成功！') // 弹出成功消息提示
    },
    onUploadError() {
      this.dialogVisible = false
      this.loadImageList(1)
      this.$msgError('图片尺寸过大！')
    },
    async onStar(toStar, id, index) {
      this.imageList[index].isLoading = true
      try {
        await starImage({ collect: toStar }, id)
        this.loadImageList(this.page)
        this.imageList[index].isLoading = false
        this.$msgSuccess(`图片${toStar ? '收藏' : '取消收藏'}成功！`)
      } catch (ex) {
        console.log(ex)
        this.imageList[index].isLoading = false
        this.$msgError(`图片${toStar ? '收藏' : '取消收藏'}成功！`)
      }
    },
    async onDelete(id, index) {
      this.imageList[index].isLoading = true
      try {
        await deleteImage(id)
        this.loadImageList(this.page)
        this.imageList[index].isLoading = false
        this.$msgSuccess('图片删除成功！')
      } catch (ex) {
        console.log(ex)
        this.imageList[index].isLoading = false
        this.$msgError('图片删除失败！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  .image-container {
    padding-top: 10px;
    .image-wrapper {
      position: relative;
      .image-operation {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        justify-content: space-evenly;
        display: none;
      }
    }
    .image-wrapper:hover .image-operation  {
      display: flex;
    }
  }
  .pagination {
    padding-top: 10px;
  }
}
::v-deep .el-dialog {
  width: 400px;
}
</style>
