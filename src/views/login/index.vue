<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="logo-head">明日头条</div>
      <el-form ref="form" :model="user">
          <el-form-item>
            <el-input
              v-model="user.mobile"
              placeholder='请输入手机号'
              prefix-icon='el-icon-phone-outline'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="user.code"
              placeholder='请输入验证码'
              prefix-icon='el-icon-edit-outline'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="checked"
            >我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="onLogin"
            >登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from 'utils/request.js'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      checked: false
    }
  },
  methods: {
    async onLogin() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      // 3.发送请求
      try {
        const res = await request({
          method: 'POST',
          url: '/mp/v1_0/authorizations',
          data: user // 请求body
        })
        console.log(res)
      } catch (ex) { // 捕获错误
        console.log(ex)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./loginBg.jpg') no-repeat;
  background-size: cover;
  .login-form-wrapper {
    min-width: 300px;
    border-radius: 10px;
    padding: 30px 50px;
    background-color: #fff;
    .logo-head {
      color: #66b1ff;
      font-weight: bold;
      font-size: 30px;
      padding-bottom: 10px;
      text-align: center;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
