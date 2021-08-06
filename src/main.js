import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // 加载组件库
import 'element-ui/lib/theme-chalk/index.css' // 加载组件库样式

Vue.use(ElementUI) // 全局注册组件库

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
