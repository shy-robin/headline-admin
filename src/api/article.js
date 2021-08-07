import request from 'utils/request.js'

const getArticleList = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}

const getArticleChannel = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

export {
  getArticleList,
  getArticleChannel
}
