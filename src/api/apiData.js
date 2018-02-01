import axios from 'axios'
import fetch from '../util/fetch'
/*
* 登录
* */
export function login (data) {
  var url = '/api/login'
  return fetch(url, {
    method: 'get',
    params: data
  }).then((res) => {
    return res
  })
}
/*
* 上传文件
* */
export function uploadFile (data) {
  return axios.post('/api/user/face/upload', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            return response
          })
        }
/*
* api
* */
export function apiPost (data, url) {
  return fetch(url, {
    method: 'get',
    params: data
  }).then(res => {
    return res
  })
}
