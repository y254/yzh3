<template>
  <div class="user">
    <!-- 头部 -->
    <div class="header">
      <!-- 个人中心头像区 -->
      <div class="avatar">
        <img :src="base + user.head_img" alt="" />
      </div>
      <!-- 个人中心用户名和时间 -->
      <div class="info">
        <div class="name">
          <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ user.nickname }}</span>
        </div>
        <div class="time">{{ user.create_date | time }}</div>
      </div>
      <!-- 个人中心右箭头按钮更改用户头像 -->
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 导航条 -->
    <!-- to不过是这个user组件的一个自定的方法,去其他名字也可以, 这里不需要:to 动态拿到数据,因为export default 里没定义数据,export default就好比new Vue 里的data的数据,这样在子组件就通过prop拿到to属性,就可以跳转到其他组件了 -->
    <yz-navitem to="/follow">
      我的关注
      <template #content>关注的内容</template>
    </yz-navitem>
    <yz-navitem>
      我的跟帖
      <template #content>跟帖/回复</template>
    </yz-navitem>
    <yz-navitem>
      我的收藏
      <template #content>文章/视频</template>
    </yz-navitem>
    <yz-navitem to="/edit">
      设置
      <template #content></template>
    </yz-navitem>

    <van-button type="danger" size="large" @click="logout">退出</van-button>
  </div>
</template>

<script>
export default {

  async created () {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  data () {
    return {
      user: ''
    }
  },
  methods: {
    // 退出功能
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗?'
        })
        // console.log('确定定')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  }

}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 3px solid #ccc;

    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      padding-left: 15px;
      font-size: 14px;
      .time {
        margin-top: 10px;
        color: #666;
      }
      .iconxingbienan {
        color: #7bbcec;
        padding-right: 5px;
      }
      .iconxingbienv {
        color: rgb(255, 139, 216);
        padding-right: 5px;
      }
    }
  }
}
</style>
