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
    }
  }
}