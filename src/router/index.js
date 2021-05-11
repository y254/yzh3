import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import Edit from '../views/user/Edit.vue'
import Demo from '../views/user/Demo.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'
import Index from '../views/news/Index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'
import Search from '../views/news/Search.vue'
Vue.use(VueRouter)

// 这个时解决登录页想要跳转到个人中心页,但没token是跳不了的,又跳回登录页,就会报错,E
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/demo', component: Demo },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function (to, from, next) {
  // 只要路由发生跳转,跳转之前这个函数就要执行
  const token = localStorage.getItem('token')
  // 如果跳转到user并有token就可以跳转,没有token就跳转到登录页
  const str = ['user', 'edit', 'myfollow', 'mycomment', 'mystar']
  if (str.includes(to.name)) {
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
