<template>
  <div>
    <!-- 头部组件 -->
    <yz-header>登录</yz-header>
    <!-- 登录和注册字体组件 -->
    <yz-logo></yz-logo>

    <!-- 登录表单 -->
    <van-form @submit="login">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '', // 用来存登录输入用户名
      password: '', // 用来存登录输入的密码
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5~11 位', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '用户名长度是3~9位', trigger: 'onChange' }
        ]
      }

    }
  },
  methods: {
    // 登录按钮
    async login () {
      // 第一种写法
      // const res = await axios({
      //   method: 'post',
      //   url: 'http://localhost:3000/login',
      //   data: {
      //     username: this.username,
      //     password: this.password
      //   }
      // })
      // 第二种写法
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 登录成功后救要保存token并跳转到个人中心
        this.$router.push('/user')
        // 在组件中必须 用this.$toast才能使用
        this.$toast.success(message)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>
<style lang="less">
</style>
