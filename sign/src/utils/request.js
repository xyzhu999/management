import axios from 'axios'
import { Message } from 'element-ui' // MessageBox,
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: /jasonandjay\.com/.test(window.location.host) ? 'https://exam.jasonandjay.com/' : 'http://169.254.12.55:7001',‘’ // api 的 base_url
  baseURL: '9527',
  // withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1) {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
