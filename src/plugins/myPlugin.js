export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        $msgSuccess(message, duration = 2000) {
          this.$message({
            type: 'success',
            message,
            duration
          })
        },
        $msgError(message, duration = 2000) {
          this.$message({
            type: 'error',
            message,
            duration
          })
        }
      }
    })
  }
}
