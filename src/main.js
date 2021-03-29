import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入vant框架和样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 全局的把vant所有的组件都导入了
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
