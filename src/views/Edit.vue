<template>
  <div class="edit">
    <yz-header>编辑资料</yz-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 导航 -->
    <yz-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{ user.nickname }}</template>
    </yz-navitem>
    <yz-navitem @click="showPasswrod">
      <template>密码</template>
      <template #content>*******</template>
    </yz-navitem>
    <yz-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{ user.gender === 1 ? "男" : "女" }}</template>
    </yz-navitem>

    <van-dialog
      v-model="isShowNickname"
      title="编辑呢称"
      @confirm="updateNickname"
      show-cancel-button
    >
      <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
      <van-field v-model="name" ref="nickname" placeholder="请输入用户名" />
    </van-dialog>

    <van-dialog
      v-model="isShowPassword"
      title="修改密码"
      @confirm="updatePassword"
      show-cancel-button
    >
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>

    <van-dialog
      v-model="isShowGender"
      title="修改性别"
      @confirm="updateGender"
      show-cancel-button
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="mask" v-show="isShowMask">
        <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
        <van-button type="danger" class="cancel" @click="isShowMask = false">取消</van-button>
        <VueCropper
        ref="aa"
        :img="img"
        autoCrop
        autoCropWidth="150"
        autoCropHeight="150"
        fixed
        ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: '',
      // 修改呢称时弹出的提示框的状态
      isShowNickname: false,
      // 用来保存修改呢称,不能直接双向绑定user里的nickname
      name: '',
      // 修改密码是弹出的提示框的状态
      isShowPassword: false,
      // 用来保存修改密码,不能直接双向绑定user里的password
      password: '',
      // 修改性别时弹出的提示框的状态
      isShowGender: false,
      gender: 0,
      // 是否显示裁剪框
      isShowMask: false,
      img: ''

    }
  },
  methods: {
    // 封装一个发送修改呢称,密码,性别,等请求
    async updateUser (data) {
      // console.log('123')
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      if (res.data.statusCode === 200) {
        // 重新渲染
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },

    // 编辑的所有内容
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // console.log(res)
        this.user = data
      }
    },
    // 点击呢称弹出修改呢称框
    async  showNickname () {
      this.isShowNickname = !this.isShowNickname
      //  点击修改呢称就呢称添加到data里的name里,这样一点击修改呢称框是就又原来的呢称显示到输入框了
      this.name = this.user.nickname
      // 等待Dom的更新
      await this.$nextTick()
      // 自动获取交焦点
      this.$refs.nickname.focus()
    },
    // 修改呢称框里确定就发送修改的请求
    updateNickname () {
      //   const userId = localStorage.getItem('userId')
      //   //   发送修改呢称的请求
      //   const res = await this.$axios.post( `/user_update/${userId}`,{   nickname: this.name
      //   })
      //   //   console.log(res)
      //   if (res.data.statusCode === 200) {
      //     this.getUserInfo()

      //     this.$toast.success('修改成功')
      //   }
      this.updateUser({
        nickname: this.name
      })
    },

    // 点击密码弹出修改密码框
    showPasswrod () {
      this.isShowPassword = !this.isShowPassword
      this.password = this.user.password
    },
    // 修改密码框里确定就发送修改的请求
    updatePassword () {
      this.updateUser({
        password: this.password
      })
    },
    // 点击性别弹出修改性别框
    showGender () {
      this.isShowGender = !this.isShowGender
      this.gender = this.user.gender
    },
    //  修改性别框里确定就发送修改的请求
    updateGender () {
      this.updateUser({
        gender: this.gender
      })
    },
    // 校验图片的类型
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.jpeg')) {
        return true
      } else {
        return false
      }
    },
    // 此时可以自行将文件上传至服务器
    afterRead (file) {
      console.log(file)
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      // 限制图片的大小
      if (file.file.size >= 40 * 1024) {
        return this.$toast.fail('上传图片 太大了')
      }
      // 显示裁剪框
      this.isShowMask = true
      this.img = file.content
    },
    // 点击裁剪拿到这张图片信息,并发送请求
    crop () {
      this.$refs.aa.getCropBlob(async blob => {
        // console.log(blob)
        // 发送请求,上传文件
        // 如果是通过ajax上传文件,请求体不能直接是一个普通对象,必须是一个formData对象
        const fd = new FormData()
        // 给formData对象添加上传的文件
        fd.append('file', blob)
        // 发送上传图片的请求
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        //   console.log(res)
        // 如果请求成功说明返回图片的信息,
        if (statusCode === 200) {
          //   那就再发送编辑用户里的上传图片请求,data.url就是那张后端返回的信息
          this.updateUser({
            head_img: data.url
          })
          // 裁剪成功就隐藏裁剪功能
          this.isShowMask = false
        }
      })
    }

  }

}
</script>

<style lang="less" scoped>
.avatar {
  padding: 40px 0;
  text-align: center;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 45px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}

/deep/ .van-dialog__content {
  padding: 0 40px;
  .van-field {
    border: 1px solid #ccc;
  }
}

.mask {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    .crop,
    .cancel {
     position: fixed;
     top: 0 ;
     z-index: 1;
    }
    .cancel {
        right: 0;
    }
}
</style>
