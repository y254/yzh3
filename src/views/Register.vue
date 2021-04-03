<template>
  <div>
    <!-- 头部组件 -->
    <yz-header>注册</yz-header>
    <!-- 登录和注册字体组件 -->
    <yz-logo></yz-logo>

    <!-- 注册表单 -->
    <van-form @submit="register">
      <van-field
        v-model="user.nickname"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
      <div class="tips">
        没有账号?去<router-link to="/login">登录</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      // 将数据保存到一个对象中,等下发送请求就发送这个对象就行了
      user: {
        nickname: '',
        username: '',
        password: ''
      },
      rules: {
        nickname: [
          { required: true, message: '呢称不能为空', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '要是中文2~6位', trigger: 'onChange' }
        ],
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
    async register () {
      const res = await this.$axios.post('/register', this.user)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 注册成功就跳转到登录页,并将用户名和密码传到登录页
        this.$router.push({
          path: '/login',
          // 通过query传参会在地址栏显示
          // query: this.user
          params: this.user
        })
        // 在组件中必须 用this.$toast才能使用
        this.$toast.success(message)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  font-size: 16px;
  text-align: right;
  padding-right: 20px;
  a {
    color: rgb(0, 4, 255);
  }
}
</style>
