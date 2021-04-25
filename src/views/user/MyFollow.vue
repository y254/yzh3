<template>
  <div class="my-follow">
     <yz-header>我的关注</yz-header>
  <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
          <div class="left">
              <img :src="$base + item.head_img" alt="">
          </div>
          <div class="center">
              <p>{{item.nickname}}</p>
              <p>{{item.create_date | time}}</p>
          </div>
          <div class="right">
              <van-button type="primary" round size="small" @click="unfollow(item.id)">取消关注</van-button>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    this.getFollowList()
  },
  methods: {
    async getFollowList () {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你是否取消关注'
        })
      } catch {
        return this.$toast('取消操作')
      }
      //   发送请求 取消关注
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getFollowList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
    padding-top: 30px;
    .item {
    display: flex;
    height: 100px;
    border-bottom: #ccc 1px solid;
    align-items: center;
    padding: 0 10px;
    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .center {
     flex: 1;
     p {
        font-size: 18px;
        padding-left: 15px;
     }
    }
}
}

</style>
