import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'views/login/'

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
    component: () => import('views/layout/'),
    children: [
      {
        path: '', // path 为空，表示作为默认子路由渲染
        name: 'home',
        component: () => import('views/home/')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('views/article/')
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('views/publish/')
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('views/image/')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('views/comment/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫，所有页面的路由跳转都会经过这里
// to: 要去的路由信息
// from: 来自哪里的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('user')
  if (to.name === 'login') { // 如果要跳转到登录页，直接放行
    next()
  } else {
    if (token) { // 如果 token 存在，直接放行
      next()
    } else { // 否则，跳转到登录页
      next({ name: 'login' })
    }
  }
})

export default router
