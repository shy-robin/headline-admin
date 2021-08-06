import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/index' // 导入插件
import './styles/reset.scss' // 样式重置

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
