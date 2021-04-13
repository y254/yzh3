<template>
  <div class="nav-item" @click="clickFn">
    <div class="title"><slot></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      // 如果this.to有跳转的值就跳转到这个值,没有值就不会走这行代码就不会跳转
      if (this.to) {
        this.$router.push(this.to)
      }
      // 触发click事件
      this.$emit('click')
    }
  },
  // 以前写法是: props:['to'] ,这样不严格
  props: {
    to: String
  }
}
</script>

<style lang="less" scoped>
.nav-item {
  display: flex;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding-left: 10px;
  border-bottom: 1px solid #ddd;
  .content {
    flex: 1;
    text-align: right;
  }
  .arrow {
    padding: 0 10px;
  }
}
</style>
