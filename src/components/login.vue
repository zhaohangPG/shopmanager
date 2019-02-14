<template>
  <el-form class="loginForm" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <h1>用户登录</h1>
    <el-form-item label="邮箱">
      <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.region"></el-input>
    </el-form-item>
    <el-button class="loginBtn" type="primary">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
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
