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
    >
      <img
        :src="previewURL"
        style="height:100px;"
      >
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile } from 'api/user.js'

export default {
  name: 'SettingIndex',
  data() {
    return {
      userProfile: {}, // 用户信息
      dialogVisible: false, // 图片预览窗口是否可见
      previewURL: '' // 预览链接
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
