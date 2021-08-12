<template>
<div>
  <el-upload
    action="#"
    list-type="picture-card"
    :limit="imgNum"
    :auto-upload=false
    :on-preview="handlePreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <div class="el-upload__tip" slot="tip">优质的图片有利于推荐，格式支持JPG、JPEG、PNG</div>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'ImgUpload',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    handleRemove(file, fileList) { // 删除图片
      console.log(file, fileList);
    },
    handlePreview(file) { // 放大图片
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.dialogVisible = true;
    },
  },
  props: {
    imgNum: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
