<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="2"><div class="grid-content bg-purple">1</div></el-col>
                <el-col :span="20"><div class="grid-content bg-purple-light">2</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">
                    <a href="" class="loginout">退出</a>
                    </div></el-col>
            </el-row>
        </el-header>
        <el-container >
            <el-aside width="200px" class="aside">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style>
.header {
    background-color: #ff0000;
}
.aside {
    background: #0f0;
    /* height: 100%; */
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
</style>
