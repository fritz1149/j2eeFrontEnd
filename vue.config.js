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
      },
      '/websocket':{
        pathRewrite:{
          '^/websocket':''
        },
        target:'ws://localhost:4396/socket',
        changeOrigin:true,
        ws:true,
      }
    }
  }
}
