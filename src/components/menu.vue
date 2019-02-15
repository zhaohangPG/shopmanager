<template>
  <el-menu :unique-opened='true' default-active="2" :router='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>用户列表</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>角色列表</el-menu-item>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>权限列表</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商品管理</span>
      </template>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>商品列表</el-menu-item>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>分类参数</el-menu-item>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>商品分类</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>订单列表</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>数据统计</span>
      </template>
        <el-menu-item index="users"><i class="el-icon-tickets"></i>数据报表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
</style>
