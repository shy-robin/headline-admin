import request from 'utils/request.js'

const getFansList = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}

export {
  getFansList
}
