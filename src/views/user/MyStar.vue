<template>
  <div class="mystar">
    <yz-header>我的收藏</yz-header>
    <!-- <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="user">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comments.length}}:跟帖</span>
          </div>
        </div>
        <div class="img">
            <img :src="$url(item.cover[0].url)" alt="">
        </div>
      </div>
    </div> -->
    <div class="list">
      <yz-post v-for="item in list" :key="item.id" :post="item"></yz-post>
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
  created () {
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // 这一步是后端的数据有问题,主页是用comment_length表示跟帖的数量,而收藏的请求数据是comment_length表示跟帖数量 ,所以遍历收藏的数据,拿到跟帖的数量将他放到comment_length再,再放到list里
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
