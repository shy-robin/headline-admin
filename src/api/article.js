import request from 'utils/request.js'

const getArticleList = params => {
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

const publishArticle = (data, draft) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // 是否存入草稿
    },
    data // 请求体数据
  })
}

const getArticleInfo = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

const updateArticle = (articleId, data, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

export {
  getArticleList,
  getArticleChannel,
  deleteArticle,
  publishArticle,
  getArticleInfo,
  updateArticle
}
