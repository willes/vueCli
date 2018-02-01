import axios from 'axios'
import { Message } from 'element-ui'
import Qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 创建axios实例
const service = axios.create({
  timeout: 5000,              // 请求超时时间
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'repeat'})
  }
})
// resquest
service.interceptors.request.use(config => {
  // NProgress.start()
    var token = sessionStorage.getItem('user') && JSON.parse(sessionStorage.getItem('user')).token
    config.params.temp = new Date().getTime()
    config.params.token = token
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(response => {
  // NProgress.done()
  return response
}, error => {
  NProgress.done()
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        sessionStorage.clear()
        break
      default:
        Message({
          message: '服务器出错啦',
          type: 'error',
          duration: 3 * 1000
        })
    }
  }
  return Promise.reject(error)
})
export default service
