<template>
  <div id="app">
    <!-- 被keep-alive 包裹的组件都会被缓存 -->
    <keep-alive include="index">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style lang="less">
</style>
