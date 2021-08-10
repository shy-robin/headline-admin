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
              <el-button type="primary" @click="onSaveProfile">保存设置</el-button>
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
      :before-close="onBeforeClose"
    >
      <div class="image-wrapper">
        <img
          class="image"
          :src="previewURL"
          ref="preview-image"
        >
      </div>
      <el-button
        style="margin-top:20px;width:100%;"
        type="primary"
        @click="onUpdateAvatar"
        :loading="isLoading"
      >保存头像</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  uploadAvatar,
  updateProfile
} from 'api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'SettingIndex',
  data() {
    return {
      userProfile: {}, // 用户信息
      dialogVisible: false, // 图片预览窗口是否可见
      previewURL: '', // 预览链接
      cropper: null, // 图片裁切器实例
      isLoading: false // 修改头像按钮是否在加载
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

      this.cropper = new Cropper(image, {
        aspectRatio: 1, // 选择框比例，固定为 1:1
        viewMode: 1, // 视图模式，设置为选择框不能超过图片区域
        cropBoxResizable: false, // 选择框大小不可变
        dragMode: 'move' // 背景可以拖拽
      })
    },
    onDialogClosed() {
      // 解决选择图片，裁切器的图片没有更新的问题
      this.cropper.destroy()
    },
    async onBeforeClose(done) {
      try {
        await this.$warningBox('确定退出编辑吗？', '提示')
        done()
      } catch {}
    },
    onUpdateAvatar() {
      this.isLoading = true // 加载中

      // 1. 获取到裁剪的图片数据
      this.cropper.getCroppedCanvas().toBlob(async file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 2. 向服务器上传图片
        try {
          // 接口要求请求头有 'Content-Type': 'multipart/form-data'
          // 这个 header 不需要手动设置，只需要 data 是一个 FormData 对象
          // 且对象里面有后端对应的字段即可
          await uploadAvatar(fd)

          // 3. 关闭窗口
          this.dialogVisible = false

          // 4. 消息提示
          this.$msgSuccess('头像修改成功！')

          // 5. 将头像直接设置为 blob 数据，这样就不用再向服务器发送更新请求了
          const blobData = window.URL.createObjectURL(file)
          this.userProfile.photo = blobData

          this.isLoading = false // 加载完成
        } catch (ex) {
          console.log(ex)

          // 3. 关闭窗口
          this.dialogVisible = false

          // 4. 消息提示
          this.$msgError('图片尺寸过大，头像修改失败！')

          this.isLoading = false // 加载完成
        }
      })
    },
    async onSaveProfile() {
      const { name, intro, email } = this.userProfile
      const res = await updateProfile({ name, intro, email })
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  .image {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
