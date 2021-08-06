import request from 'utils/request.js'

// 用户登录
const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data // 请求body
  })
}

// 获取用户信息
const getUserProfile = () => {
  // 获取 localStorage 中的 token
  // const token = window.localStorage.getItem('user')

  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // // 将 token 数据加入请求头 Authorization 中
    // headers: {
    //   Authorization: `Bearer ${token}` // 注意格式！！！
    // }
  })
}

export {
  login,
  getUserProfile
}
