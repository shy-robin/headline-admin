<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="userProfile" label-width="60px">
            <el-form-item label="编号">
              <el-input disabled v-model="userProfile.id"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input disabled v-model="userProfile.mobile"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userProfile.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userProfile.email"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="userProfile.intro"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="display:flex;justify-content:center;">
          <div class="avatar-wrapper">
            <el-avatar
              :size="240"
              :src="userProfile.photo"
            ></el-avatar>
            <div>
              <label for="file">点击编辑头像</label>
              <input
                type="file"
                id="file"
                @change="onFileChange"
                ref="file"
                hidden
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <img
        :src="previewURL"
        style="height:100px;"
        ref="preview-image"
      >
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from 'api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'SettingIndex',
  data() {
    return {
      userProfile: {}, // 用户信息
      dialogVisible: false, // 图片预览窗口是否可见
      previewURL: '', // 预览链接
      cropper: null // 图片裁切器实例
    }
  },
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const res = await getUserProfile()
        this.userProfile = res.data.data
      } catch (ex) {
        console.log(ex)
      }
    },
    onFileChange() {
      // 选择的文件
      const file = this.$refs.file
      // 生成一个预览链接
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewURL = blobData
      // 显示预览窗口
      this.dialogVisible = true
      this.$refs.file.value = null
    },
    onDialogOpened() {
      const image = this.$refs['preview-image']

      // 方式二：调用 cropper 中的 replace 方法
      // 但会存在图片切换时闪烁的问题，效果没有方式一好
      if (this.cropper) {
        this.cropper.replace(this.previewURL)
        return
      }

      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        }
      })
    },
    onDialogClosed() {
      // 解决选择图片，裁切器的图片没有更新的问题
      // 原因：cropper 实例没有改变，图片就不会改变
      // 方式一：在dialog关闭后，销毁 cropper 实例
      // this.cropper.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
