<template>
 <div>
        <yz-floor :count="count - 1" :comment="comment.parent" v-if="comment.parent"></yz-floor>
  <div class="yz-floor">
    <div class="title">
        <div class="left">{{count}}:{{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | now}}</div>
        <div class="right" @click="reply">回复</div>
    </div>
    <div class="content">{{comment.content}}</div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'yz-floor',
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    reply () {
      // 把id和inckname传给父组件
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }

  }
}
</script>

<style lang="less" scoped>
  .yz-floor {
      border: 1px solid #ccc;
      padding: 10px;
      margin-top: -1px;
      .title {
          display: flex;
          font-size: 14px;
          .center {
              flex: 1;
              font-size: 14px;
              color: #666;
              padding-left: 10px;
          }
          .right {
              color:   #666;
          }
      }
      .content {
          font-size: 14px;
          margin-top: 10px;
      }
  }
</style>
