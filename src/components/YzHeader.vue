<template>
  <!-- 这是通用的头部 -->
  <div class="yz-header">
    <!-- 左箭头盒子 -->
    <div class="back" @click="back">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <!-- 头部的提示内容 -->
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.yz-header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  text-align: center;
  line-height: 50px;
  .back,
  .extra {
    width: 50px;
  }
  .iconfont {
    font-size: 16px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
