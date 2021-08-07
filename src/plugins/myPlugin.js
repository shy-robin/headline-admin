export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        // 消息提示（成功）
        $msgSuccess(message, duration = 2000) {
          this.$message({
            type: 'success',
            message,
            duration
          })
        },
        // 消息提示（错误）
        $msgError(message, duration = 2000) {
          this.$message({
            type: 'error',
            message,
            duration
          })
        },
        // 消息提示（普通）
        $msgNormal(message, duration = 2000) {
          this.$message({
            message,
            duration
          })
        },
        // 警告弹窗
        $warningBox(content, title) {
          // 返回一个 Promise 对象
          return this.$confirm(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      }
    })
  }
}
