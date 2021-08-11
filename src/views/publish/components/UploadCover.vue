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
          <image-list
            ref="imageList"
            :is-show-Add="false"
            :is-show-operation="false"
            :is-show-checked="true"
          />
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
import { uploadImage } from 'api/image.js'
import ImageList from 'components/image-list/'

export default {
  name: 'UploadCover',
  components: {
    ImageList
  },
  props: ['value'],
  data() {
    return {
      dialogVisible: false,
      activeTab: 'lib',
      checkedFile: '',
      previewImage: '',
      isUploadLoading: false
    }
  },
  methods: {
    onUploadCover() {
      this.dialogVisible = true
    },
    onChooseImage() {
      this.dialogVisible = false
      const currentIndex = this.$refs.imageList.currentCheckedIndex
      const imageList = this.$refs.imageList.imageList
      this.$emit('input', imageList[currentIndex].url)
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
