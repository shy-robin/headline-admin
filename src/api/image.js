import request from 'utils/request.js'

const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口都会要求请求头：Content-Type: 'multipart/form-data'
    // 我们不需要手动设置这个请求头，axios 会自动设置，只要给 data 是一个 FormData 对象即可
    data
  })
}

export {
  uploadImage
}
