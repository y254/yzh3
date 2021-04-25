<template>
  <div class="demo">
      <van-button type="primary" @click="crop">裁剪</van-button>
      <!--
      img: 指定裁剪图片
      autoCrop:是否默认生成裁剪框
      autoCropWidth="150"
      autoCropHeight="150" 指定裁剪框宽高
      fixed： 固定裁剪框的宽高比
      :fixedNumber="[2,1]"
      fixedBox : 不能调整大小
     -->
      <VueCropper
      ref="cropper"
      autoCrop
      autoCropWidth="150"
      autoCropHeight="150"
      fixed
      img="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2%2F58b4ef69ed377.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620713107&t=9a238c2ec7760f6310e665cf06d956b4"></VueCropper>

  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },

  methods: {
    crop () {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
      })
    }
  }
}

</script>

<style lang="less">
.demo {
    width: 100%;
    height: 100%;
    position: fixed;
}

</style>
