<template>
  <div class="my-comment">
      <yz-header>我的评论</yz-header>
      <div class="list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            >
          <div class="item" v-for="item in commentList" :key="item.id">
              <div class="time">{{item.create_date | time('YYYY-MM-DD  HH:mm')}}</div>
              <div class="comment" v-if="item.parent">
                  <div class="name">回复:{{item.parent.user.nickname}}</div>
                  <div class="comment_content">{{item.parent.content}}</div>
              </div>
              <div class="content">{{item.content}}</div>
              <div class="origin">
                  <span class="one-txt-cut" @click="$router.push(`/post-detail/${item.post.id}/`)">原文:{{item.post.title}}</span>
                  <span class="iconfont iconjiantou1"></span>
              </div>
          </div>
          </van-list>
        </van-pull-refresh>
      </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      list: [],
      // 显示加载状态, true代表list组件正在加载数据,此时不会触发onLoad事件,要false时才隐藏加载状态就会触发onLoad事件
      // 当滚动到底部时,触发onLoad的时候,自动会把loading改成true
      loading: false,
      // 代表是否结束, false代表还有数据 true代表没有数据
      finished: false,
      // 当前页
      pageIndex: 1,
      // 当前页的评论数量
      pageSize: 6,
      // 代表是否正在下拉刷新, 等数据加载完, 需要把下拉刷新改成false
      refreshing: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)

        // 上拉加载状态改成false,加载完成了
        this.loading = false
        // 把下拉的状态改成false
        this.refreshing = false

        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般 为 ajax 请求
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        // console.log('下拉刷新中')
        // 下拉刷新需要清除原来的数据
        this.commentList = []
        // 防止之前已经没有数据了
        this.finished = false
        this.loading = true
        // 重新加载第一页的数据
        this.pageIndex = 1
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>

  .item {
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    font-size: 18px;
    color: rgb(136, 136, 136);
  .time {
      padding: 20px 0;
    }
    .comment{
        padding: 20px;
        background-color: #ddd;
        .name {
            font-size: 14px;
             padding-bottom: 15px;
        }
    }
   .content {
      padding: 20px 0 10px;
      color: rgb(41, 39, 39);

   }
   .origin {
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
   }
  }

</style>
