module.exports = {
  lintOnSave:false,
  transpileDependencies: [
    'vuetify'
  ],
  // 生产的baseUrl
  // publicPath: 'xxx',
  devServer: {
    // 换成自己电脑上后端测试的端口
    proxy: 'http://localhost:4396'
  }
}
