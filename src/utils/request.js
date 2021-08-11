import axios from 'axios'
import JSONBig from 'json-bigint'
import router from '@/router/index.js'
import { Message } from 'element-ui'

// 创建一个 axios 实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/',
  // 定义 axios 对后端返回的原始数据的处理
  transformResponse: [
    // data 就是后端返回的原始数据（未经处理的 JSON 字符串）
    function(data) {
      // 后端返回的数据可能不是 JSON 格式的字符串，所以要做异常处理
      try {
        return JSONBig.parse(data)
      } catch (err) {
        // console.log('转换失败：', err)
        return data
      }
    }
  ]
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

// 添加响应拦截器
request.interceptors.response.use(
  response => { // 所有状态码为 2xx 的响应会进入这里
    return response // 成功状态码，直接返回响应
  },
  error => { // 任何状态码超出 2xx 的响应会进入这里
    // 1. 获取状态码
    const { status } = error.response

    // 2. 处理异常状态码
    if (status === 401) {
      window.localStorage.removeItem('user') // 清除浏览器中的 token
      router.push({ name: 'login' }) // 跳转到登录页
      Message.error({
        message: '登录状态无效，请重新登录！',
        center: true
      })
    } else if (status === 403) {
      Message.warning({
        message: '没有操作权限！',
        center: true
      })
    } else if (status === 400) {
      Message.error({
        message: '请求参数错误，请重新检查！',
        center: true
      })
    } else if (status >= 500) {
      Message.error({
        message: '服务器内部异常，请稍后重试！',
        center: true
      })
    }

    // 3. 异常返回
    return Promise.reject(error)
  }
)

export default request
