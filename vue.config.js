module.exports = {
  lintOnSave:false,
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open:true,
    proxy:{
      '/api':{
        pathRewrite:{
          '^/api':''
        },
        target:'http://localhost:4396',
        changeOrigin:true,
        ws:true,
      }
    }
  }
}
