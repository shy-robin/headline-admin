import Vue from 'vue'

// 注册 ElementUI 组件（完整引入）
import ElementUI from 'element-ui' // 加载组件库
import 'element-ui/lib/theme-chalk/index.css' // 加载组件库样式

// 注册自定义组件
import myPlugin from './myPlugin'

Vue.use(ElementUI)
Vue.use(myPlugin)
