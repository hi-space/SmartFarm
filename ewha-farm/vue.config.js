module.exports = {
  publicPath: '/',
  transpileDependencies: [
    // "vuetify",
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}