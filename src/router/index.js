import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    // layout 路由有一个默认子路由，所以 name 属性无意义
    // 所以如果有默认子路由，就不要给父路由设置 name 属性，否则会有警告且无法正常显示路由
    path: '/',
    // name: 'layout',
    component: () => import('views/layout/index.vue'),
    children: [
      {
        path: '', // path 为空，表示作为默认子路由渲染
        name: 'home',
        component: () => import('views/home/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
