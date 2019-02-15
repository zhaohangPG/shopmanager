<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="2"><div class="grid-content bg-purple">
                    <img src="../assets/logo.png" alt=""></div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light tac">
                    <h2 class="title">电商后台管理页面</h2>
                    </div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple tac pt20">
                     <el-button type="danger" @click="logout()">退出</el-button>
                    <!-- <a href="" class="loginout" @click.prevent="logout()">退出</a> -->
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container >
            <el-aside width="200px" class="aside">
                <app-menu></app-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import appMenu from './menu'

export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {

    }
  },
  components: {
    appMenu
  },
  name: 'app'
}
</script>

<style>
.header {
    background-color: gray;
}
.aside {
    background-color: #fff;
}
.container {
    height: 100%;
}
.loginout {
    text-decoration: none;
    color: #000;
    text-align: center;
    line-height: 60px;
}
.tac {
    text-align: center;
}
.title {
    line-height: 60px;
    color: #fff;
}
.pt20 {
    padding-top: 10px;
}
</style>
