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
  },
  devServer: {
    proxy: {
      '/api': {
        // 将 /api 开头的请求拼接到 target 后面
        // 比如请求 /api => http://api-toutiao-web.itheima.net/api
        target: 'http://api-toutiao-web.itheima.net/',
        changeOrigin: true, // 是否跨域
        ws: true, // 是否代理 websockets
        // 将 /api 开头的请求的 /api 字符串替换成空字符，然后再拼接
        // 比如请求 /api => '' => http://api-toutiao-web.itheima.net/
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}