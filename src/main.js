import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入通用的样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入全局通用组件
import './utils/golobal'
// 导入全局配置axios请求
import './utils/request'
// 导入全局注册过滤器
import './utils/filters'
// 导入全局vant
import './utils/vant'
// 导入amfe-flexible 库
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
