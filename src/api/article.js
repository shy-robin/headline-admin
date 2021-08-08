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

const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

export {
  getArticleList,
  getArticleChannel,
  deleteArticle
}
