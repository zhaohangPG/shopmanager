<template>
  <el-form class="loginForm" :label-position="labelPosition" label-width="80px" :model="formdata">
    <h1>用户登录</h1>
    <el-form-item label="邮箱">
      <el-input v-model="formdata.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
    </el-form-item>
    <el-button class="loginBtn" type="primary" @click="login()">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log('登录按钮')
      this.$http
        .post('login', this.formdata)
        .then(res => {
          const { msg, status } = res.data.meta
          console.log(msg, status)
          if (status === 200) {
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$message.error(msg)
          }
        })
    }
  }
}
</script>

<style>
h1 {
  color: #000;
}
.loginForm {
  padding: 30px;
  background-color: #ffffff;
  margin: 100px auto;
  width: 400px;
  height: 300px;
}
.loginBtn {
  width: 100%;
}
</style>
