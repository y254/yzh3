import Vue from 'vue'
// 导入axios请求库
import axios from 'axios'
import router from '../router/index'
// 导入vant框架和样式
import { Toast } from 'vant'

// 将axios挂载到vue原型对象上,这样其他组件就可以通过this.$axios来拿到这个方法了
Vue.prototype.$axios = axios
//  给axios配置默认的baseURL,基准地址
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$base = 'http://localhost:3000'

// 在请求拦截器中可以通过config.headers访问到所有的请求头
// 给axios配置拦截器,请求会先经过请求拦截器,才到服务器 这样不用一个一个组件的去吧token设置到请求头中
axios.interceptors.request.use(function (config) {
  // config指定时拦截到请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 在项目中配置响应拦截器解决token失效问题  全局的
// 响应会先经过响应拦截器,才到浏览器 这样不用一个一个组件的去设置token失效问题
axios.interceptors.response.use(function (response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail(message)
  }
  return response
})
