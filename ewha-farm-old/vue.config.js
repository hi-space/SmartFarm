const fs = require('fs')

module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  devServer: {
    // host: '0.0.0.0',
    // https: true,
    // https: {
    //   key: fs.readFileSync('./certs/domain.com.key'),
    //   cert: fs.readFileSync('./certs/domain.com.crt'),
    // },
    // public: 'https://localhost:8081/',
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

