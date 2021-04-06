import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  // 只要路由发生跳转,跳转之前这个函数就要执行
  const token = localStorage.getItem('token')
  // 如果跳转到user并有token就可以跳转,没有token就跳转到登录页
  if (to.name === 'user') {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
    // 如果跳转的不是user就可以跳转到相应的页面
  } else {
    next()
  }
})

export default router
