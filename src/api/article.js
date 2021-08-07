import request from 'utils/request.js'

const getArticleList = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles'
  })
}

export {
  getArticleList
}
