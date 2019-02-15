<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="query" class="inputSear">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success">添加用户</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="邮箱"></el-table-column>
      <el-table-column prop="email" label="电话"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  created () {
    this.getData()
  },
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      list: []
    }
  },
  methods: {
    getData () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
            this.pagesize
          }`
        )
        .then(res => {
          console.log(res)
          const {
              data:{
                  data:{
                      users
                  },
                  meta:{
                      status
                  }
              }
          }=res
          console.log(users,status)
          if (status===200) {
              this.list=users
          }
        })
    }
  }
}
</script>

<style>
.card {
  height: 100%;
}
.inputSear {
  margin-top: 20px;
  width: 500px;
}
</style>
