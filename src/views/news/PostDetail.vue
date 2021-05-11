<template>
  <div class="post-detail">

    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="follow" @click="follow" v-else >关注</div>
      </div>
    </div>

    <div class="content">
        <div class="title">{{post.title}}</div>
        <div class="name">
            <span>{{post.user.nickname}}</span>
            <span>{{post.create_date | time}}</span>
        </div>
        <div class="info" v-if="post.type === 1" v-html="post.content"></div>
        <video v-else :src="getUrl(post.content)" controls></video>

        <div class="buttons">
            <div clsss="good"  @click="like" :class="{active: post.has_like}">
                <span class="iconfont icondianzan"></span>
                <span>{{post.like_length || 0}}</span>
            </div>
            <div class="share">
                <span class="iconfont iconweixin"></span>
                <span>微信</span>
            </div>
        </div>
    </div>

    <div class="comment-list">
     <h3>精彩跟帖</h3>
     <yz-comment
     :comment="comment"
     v-for="comment in commentList"
     :key="comment.id"
     @reply="onReply"></yz-comment>
    </div>

    <div class="footer-input" v-if="isShowTextArea">
        <div class="search">
            <input type="text" placeholder="回复" @focus="onFocus">
        </div>
        <span class="iconfont iconpinglun-"><i>20</i></span>
        <span class="iconfont iconshoucang" @click="star" :class="{now: post.has_star}"></span>
        <span class="iconfont iconfenxiang"></span>
    </div>

    <div class="footer-textarea" v-else>
       <textarea @blur="onBlur" :placeholder="'回复:' + nickname" ref="textarea" v-model="content"></textarea>
       <van-button type="primary" @click="publish">发送</van-button>
    </div>

  </div>
</template>
a
<script>
export default {
  data () {
    return {
      post: {
        // <span>{{post.user.nickname}}</span> 防止报错
        user: {}
      },
      commentList: [],
      isShowTextArea: true, // 是否显示textarea
      content: '', // 发表评论的内容
      nickname: '', // 用来保存回复那条呢称
      replyId: '' // 用来保存回复的那条id
    }
  },
  created () {
    this.getInfo()
    // 获取文章的评论列表,
    this.getCommentList()

    // 给bus注册自定义事件
    this.$bus.$on('reply', this.onReply)
  },
  destroyed () {
  // 移除bus上所有事件 this.$bus.off()
  // 移除bus上所有reply事件
    this.$bus.$off('reply', this.onReply) // 移除bus上一个reply事件,对应的函数
  },
  methods: {
    // 封装了一个方法
    checkLogin () {
      // 点击关注或点赞,判断是否有token,
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有就说明没登陆就跳到登录页
        this.$router.push({
          path: '/login',
          // 会在地址栏上显示http://localhost:8080/#/login?back=true,这样就可以在login页面判段有back=true就可以后退,没有就不后退,
          query: {
            back: true
          }
        })
        // 没登录就返回一个false
        return false
      }
    },
    // 发送文章详情页
    async getInfo () {
      // 需要id
      const { id } = this.$route.params
      const res = await this.$axios.get(`/post/${id}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    // 发送请求,关注用户,
    async follow () {
      // 如果调用函数的返回有false就return,就不执行下面的代码,
      if (this.checkLogin() === false) {
        return
      }
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    // 发送请求,取消关注
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.getInfo()
      }
    },
    // 发送点赞请求
    async like () {
    //  先判断是否登录过,登录了就可以点赞,没登陆就先跳转到登录页
      // 如果调用函数的返回有false就return,就不执行下面的代码,
      if (this.checkLogin() === false) {
        return
      }
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    // 发送收藏请求
    async star () {
      if (this.checkLogin() === false) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    // 发送评论请求
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.CommentList)
      }
    },
    // 点击input框显示textarea文本框
    async onFocus () {
      // 让 input隐藏
      this.isShowTextArea = false
      // 等待dom更新
      await this.$nextTick()
      // 让textarea自动获取焦点
      this.$refs.textarea.focus()
    },
    // 点击发表按钮发送textarea内容的请求
    async publish () {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      console.log(res)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 重新发送请求获取文章的评论列表,
        this.getCommentList()
        // 将textarea里的内容清空
        this.content = ''
        this.nickname = ''
        this.replyId = ''
        // 并让input显示
        this.isShowTextArea = true
      }
    },
    async onReply (id, nickname) {
      console.log('bus', id, nickname)
      // 隐藏inpu框，显示textarea
      this.isShowTextArea = false
      await this.$nextTick()
      // 让textarea自动获取焦点
      this.$refs.textarea.focus()

      // 回显nickname
      this.nickname = '@' + nickname
      this.replyId = id
    },
    onBlur () {
      if (!this.content) {
        this.isShowTextArea = true
        this.replyId = ''
        this.nickname = ''
      }
    }

  }
}
</script>

<style lang='less' scoped>
 .header {
     display: flex;
     padding: 0 10px;
     border-bottom: 1px solid #ccc;
     height: 50px;
     align-items: center;
     .left {
         span {
             line-height: 50px;
             padding-right: 5px;
         }
     }
     .center {
         flex: 1;
         span {
             font-size: 50px;
         }
     }
     .right {
         font-size: 14px;
         div {
             width: 60px;
             height: 30px;
             text-align: center;
             line-height: 30px;
             border-radius: 15px;
         }
         .followed {
             border: 1px solid #ccc;
         }
         .follow {
             color: #fff;
             background-color: #f00;
         }
     }
 }
 .content {
     padding: 10px 5PX;
     border-bottom: 2px solid #ccc;
     .title {
        font-weight: 700;
        font-size: 18px;
     }
     .name {
         font-size: 14px;
         color: #666;
         margin: 10px 0;
      span:first-child{
          margin-right: 10px;
       }
     }
   /deep/ .info {
       font-size: 14PX;
         img {
           width: 100%;
         }
     }
     video {
         width: 100%;
     }
     .buttons {
         display: flex;
         padding: 20px 0;
         justify-content: space-around;

       .active {
           border-color: red;
           color: red;
       }
       div {
         width: 120px;
         height: 40px;
         line-height: 40px;
         border-radius: 20px;
         border: 1px solid #ccc;
         text-align: center;
          font-size: 16px;
         .iconfont {
            font-size: 18px;
            margin-right: 5px;
         }
         .iconweixin {
             color: #09c909;
         }
       }
     }
 }
 .comment-list{
   h3 {
     text-align: center;
     font-weight: normal;
     font-size: 25px;
     padding: 10px;
   }
 }
 .footer-input {
      display: flex;
      height: 50px;
      border-top: 1px solid #ccc;
      background-color: white;
      width: 100%;
      position: fixed;
      bottom: 0;
      align-items: center;
      justify-content: space-around;
      padding-left: 10px;

      .search {
          input {
              width: 210px;
              height: 35px;
              background-color: #d7d7d7;
              border: none;
              border-radius: 17px;
              font-size: 14px;
              text-indent: 1em;
          }
      }
      .iconfont {
          font-size: 24px;
        }
      .iconpinglun- {
            position: relative;
            i {
                position: absolute;
                right: 0;
                top: -5px;
                background-color: red;
                font-size: 10px;
                color: #fff;
                padding: 0 3px;
                right: -6px;
                border-radius: 5px;
                font-style: normal;
            }
        }
      .now {
          color: red;
      }
 }
 .footer-textarea {
   display: flex;
   width: 100%;
   height: 100px;
   position: fixed;
   z-index: 999;
   bottom: 0;
   padding: 10px;
   align-items: flex-end;
   justify-content: space-around;
   background-color: #fff;
   border-top: 1px solid #ccc;
   textarea {
     width: 260px;
     height: 80px;
     background-color: #ccc;
     border-radius: 10px;
     border: none;
     padding: 10px;
     font-size: 14px;

   }
 }
</style>
