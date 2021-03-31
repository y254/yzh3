import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'
// 导入vant框架和样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入amfe-flexible库
import 'amfe-flexible'

// 全局注册组件
import YzHeader from './components/YzHeader.vue'
Vue.component('yz-header', YzHeader)

// 全局的把vant所有的组件都导入了
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
