<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>

 <van-sticky class="more-sticky">
  <div class="more" @click="$router.push('/manage')">
      <span class="iconfont iconlianjie"></span>
   </div>
  </van-sticky>

   <van-tabs v-model="active" sticky animated swipeable>
    <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >
        <yz-post :post="item" v-for="item in newsList" :key="item.id"></yz-post>
     </van-list>
   </van-pull-refresh>

    </van-tab>
   </van-tabs>

  </div>
</template>

<script>

export default {
  data () {
    return {
      // 点击栏目的序号
      active: 0,
      tabList: [], // 用于存放栏目列表数据
      newsList: [], // 用于存放新闻
      pageIndex: 1,
      pageSize: 5,
      // 加载状态
      loading: false,
      // 是否加载完成
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    // 获取栏目列表页
    async getTabList () {
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    // 获取新闻列表
    async getNewsList (id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data

      if (statusCode === 200) {
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        // 数据加载完成,需要把loading改成false
        this.loading = false
        this.refreshing = false

        // 判断是否还有跟多数据
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        // console.log('需要加载更多了')
        // 加载下一页数据
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  },

  watch: {
    active (value) {
      console.log(value)
      // 重新加载当前分类下的数据
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[value].id)
      }, 1000)
    }
  }
}

</script>

<style lang="less" scoped>
.header {
    display: flex;
    height: 50px;
    background-color: #ff0000;
    line-height: 50px;
    text-align: center;
    color: #fff;
    .logo,.user {
        width: 70px;
    }
    .logo {
          span {
              font-size: 50px;
          }
    }
    .user {
        span {
            font-size: 24px;
        }
    }
    .search {
        flex: 1;
        .search-box {
            height: 34px;
            line-height: 34px;
            background-color: #f97776;
            margin-top: 8px;
            border-radius: 17px;
            font-size: 14px;
            span:first-child {
                margin-right: 5px;
            }
        }
    }
}
/deep/ .van-tabs__wrap {
  width: 85%;

}
.more {
  width: 15%;
  height: 45px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: white;
  text-align: center;
  line-height: 45px;
}
.more-sticky {
 /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
