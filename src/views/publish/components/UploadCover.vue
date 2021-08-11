<template>
  <div class="upload-cover-container">
    <div
      class="avatar-uploader"
      @click="onUploadCover"
    >
      <img v-if="value" :src="value" class="avatar">
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
              :xs="12" :sm="8" :md="6"
            >
            <div class="image-wrapper">
              <el-image
                class="image"
                :src="item.url"
                fit="fill"
                @click="onImageCheck(index)"
                lazy
              ></el-image>
              <div class="image-check" v-if="index===currentCheckedIndex">
                <i class="el-icon-check"></i>
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
          <el-button
            type='primary'
            style="margin-top:10px;float:right;margin-right:10px;"
            @click="onChooseImage"
          >选择</el-button>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <div>
            <input type="file" ref="file" @change="onFileChange">
          </div>
          <div>
            <el-image
              :src="previewImage"
            />
          </div>
          <el-button
            type='primary'
            style="margin-top:10px;float:right;margin-right:10px;"
            @click="onConfirmImage"
            :loading="isUploadLoading"
          >确定</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getImageList, uploadImage } from 'api/image.js'

export default {
  name: 'UploadCover',
  props: ['value'],
  data() {
    return {
      dialogVisible: false,
      activeTab: 'lib',
      isCollect: false,
      perPage: 8,
      page: 1,
      totalCount: 0,
      imageList: [],
      currentCheckedIndex: null,
      checkedFile: '',
      previewImage: '',
      isUploadLoading: false
    }
  },
  methods: {
    onUploadCover() {
      this.loadImageList(1)
      this.dialogVisible = true
    },
    async loadImageList(page) {
      this.currentCheckedIndex = null
      try {
        const res = await getImageList({
          page,
          collect: this.isCollect,
          per_page: this.perPage
        })
        const { results: imageList, total_count: totalCount } = res.data.data
        imageList.forEach(item => { // 给每张图片都添加一个 isLoading 属性
          item.isLoading = false
          item.isChecked = false
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
    onImageCheck(index) {
      this.currentCheckedIndex = index
    },
    onChooseImage() {
      this.dialogVisible = false
      this.$emit('input', this.imageList[this.currentCheckedIndex].url)
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      if (file) {
        const blobData = window.URL.createObjectURL(file)
        this.previewImage = blobData
        this.checkedFile = file
      }
    },
    async onConfirmImage() {
      if (!this.checkedFile) {
        this.$msgError('请选择图片！')
        return
      }
      this.isUploadLoading = true
      const fd = new FormData()
      fd.append('image', this.checkedFile)
      try {
        const res = await uploadImage(fd)
        const url = res.data.data.url
        this.$emit('input', url)
        this.$msgSuccess('上传图片成功！')
        this.isUploadLoading = false
        this.dialogVisible = false
      } catch (ex) {
        console.log(ex)
        this.$msgError('图片尺寸过大！请重新上传')
        this.isUploadLoading = false
      }
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
.image-wrapper {
  position: relative;
  .image {
    height:140px;
    width:100%;
  }
  .image-check {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background-color: #67c23a;
    text-align: center;
    i {
      color: #fff;
    }
  }
}
.image-wrapper:hover {
  cursor: pointer;
}
</style>
