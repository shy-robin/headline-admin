const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': path.resolve(__dirname, 'src/components'),
        'views': path.resolve(__dirname, 'src/views'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'api': path.resolve(__dirname, 'src/api'),
      }
    },
    // 告诉 webpack 使用 script 的全局变量加载，而不是使用 node_modules 的包
    externals: {
      // 【包名】: 【script 中暴露的全局变量名（在 CDN 文件上找）】
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts'
    }
  }
}