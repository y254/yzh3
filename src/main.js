import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'
// 导入vant框架和样式
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'

// 导入amfe-flexible 库
import 'amfe-flexible'

// 导入axios请求库
import axios from 'axios'

// 导入时间插件
import moment from 'moment'

// 全局注册通用组件
import YzHeader from './components/YzHeader.vue'
import YzLogo from './components/YzLogo.vue'
import YzNavitem from './components/YzNavitem.vue'

Vue.component('yz-header', YzHeader)
Vue.component('yz-logo', YzLogo)
Vue.component('yz-navitem', YzNavitem)

// 定义全局过滤器
Vue.filter('time', input => {
  return moment(input).format('YYY-MM-DD')
})

// 将axios挂载到vue原型对象上,这样其他组件就可以通过this.$axios来拿到这个方法了
Vue.prototype.$axios = axios
//  给axios配置默认的baseURL,基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 在请求拦截器中可以通过config.headers访问到所有的请求头
// 给axios配置拦截器
axios.interceptors.request.use(function (config) {
  // config指定时请求的配置信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 在项目中配置响应拦截器解决token失效问题
// 全局的把vant所有的组件都导入了
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
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
