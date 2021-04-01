import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'
// 导入vant框架和样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入amfe-flexible 库
import 'amfe-flexible'

// 导入axios请求库
import axios from 'axios'

// 全局注册通用组件
import YzHeader from './components/YzHeader.vue'
import YzLogo from './components/YzLogo.vue'
Vue.component('yz-header', YzHeader)
Vue.component('yz-logo', YzLogo)

// 将axios挂载到vue原型对象上,这样其他组件就可以通过this.$axios来拿到这个方法了
Vue.prototype.$axios = axios
//  给axios配置默认的baseURL,基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 全局的把vant所有的组件都导入了
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
