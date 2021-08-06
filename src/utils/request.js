import axios from 'axios'

// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

// 添加请求拦截器
request.interceptors.request.use(
  // 所有请求都会经过这里
  // config 是当前请求的配置信息
  // config 是可以修改的
  config => {
    // console.log(config)
    // 获取 token
    const token = window.localStorage.getItem('user')
    // 请求头中添加 token
    config.headers.Authorization = `Bearer ${token}` // 注意格式！！！

    // 必须返回 config，否则请求不会发出去
    return config
  },
  // 请求失败会经过这里
  error => {
    console.log(error)
  }
)

export default request
