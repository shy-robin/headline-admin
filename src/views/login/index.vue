<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="logo-head">明日头条</div>
      <el-form ref="loginForm" :model="user" :rules='formRules'>
          <el-form-item prop='mobile'>
            <el-input
              v-model="user.mobile"
              placeholder='请输入手机号'
              prefix-icon='el-icon-phone-outline'
            ></el-input>
          </el-form-item>
          <el-form-item prop='code'>
            <el-input
              v-model="user.code"
              placeholder='请输入验证码'
              prefix-icon='el-icon-edit-outline'
            ></el-input>
          </el-form-item>
          <el-form-item prop='isAgree'>
            <el-checkbox
              v-model="user.isAgree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="onLogin"
              :loading='isLoading'
            >登录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from 'api/user.js'

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        isAgree: false // 是否同意协议
      },
      isLoading: false, // 是否登录中
      formRules: {
        mobile: [
          { required: true, message: '手机号不为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式不正确', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'change' }
        ],
        isAgree: [
          {
            validator(rule, value, callback) {
              if (value) {
                callback() // 校验成功
              }
              callback(new Error('请同意协议')) // 校验失败，返回错误信息
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLogin() {
      // 点击按钮表单验证
      this.$refs.loginForm.validate(valid => {
        // 验证失败，返回
        if (!valid) return false
        // 验证成功，进行登录请求
        this.login()
      })
    },
    async login() {
      this.isLoading = true // 登录中 loading...

      // 发送请求，处理响应
      try {
        const res = await login(this.user)
        this.$msgSuccess('登录成功！')
        console.log(res)
        this.$router.push({
          name: 'home'
        })
      } catch (ex) { // 捕获错误
        this.$msgError('登录失败！')
        console.log(ex)
      }
      this.isLoading = false // 关闭 loading
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
