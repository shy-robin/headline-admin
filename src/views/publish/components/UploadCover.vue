<template>
  <div class="upload-cover-container">
    <div
      class="avatar-uploader"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadCover',
  data() {
    return {
      imageUrl: ''
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
