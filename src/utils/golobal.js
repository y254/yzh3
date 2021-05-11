import Vue from 'vue'
// 全局注册通用组件
import YzHeader from '../components/YzHeader.vue'
import YzLogo from '../components/YzLogo.vue'
import YzNavitem from '../components/YzNavitem.vue'
import YzPost from '../components/YzPost.vue'
import YzComment from '../components/YzComment.vue'
import YzFloor from '../components/YzFloor.vue'
Vue.component('yz-header', YzHeader)
Vue.component('yz-logo', YzLogo)
Vue.component('yz-navitem', YzNavitem)
Vue.component('yz-post', YzPost)
Vue.component('yz-comment', YzComment)
Vue.component('yz-floor', YzFloor)
