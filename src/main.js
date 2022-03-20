import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.OssUrl="https://huahuaxiaomuzhu.oss-cn-beijing.aliyuncs.com"
Vue.prototype.baseUrl="http://localhost:4396"
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
