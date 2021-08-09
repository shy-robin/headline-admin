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
          <el-form ref="form" :model="settingForm" label-width="60px">
            <el-form-item label="编号">
              <el-input v-model="settingForm.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="settingForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机">
              <el-input v-model="settingForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="settingForm.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input type="textarea" v-model="settingForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" style="display:flex;justify-content:center;">
          <el-avatar
            :size="240"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          ></el-avatar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingIndex',
  data() {
    return {
      settingForm: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
