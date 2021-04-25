<template>
  <div class="mystar">
    <yz-header>我的收藏</yz-header>
    <div class="list">
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
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
border-bottom: 1px solid #000;
padding: 10px;
display: flex;
.info {
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
        color: #666;
        font-size: 14px;
    }
}
.img {
    img {
        width: 120px;
        height: 74px;
        object-fit: cover;
    }
}
}

</style>
