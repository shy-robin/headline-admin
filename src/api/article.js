import request from 'utils/request.js'

const getArticleList = (page, perPage) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: {
      page, // 第几页
      per_page: perPage // 每页多少条
    }
  })
}

export {
  getArticleList
}
