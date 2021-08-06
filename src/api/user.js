import request from 'utils/request.js'

// 用户登录
const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data // 请求body
  })
}

export {
  login
}
