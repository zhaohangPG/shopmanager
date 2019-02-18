<template>
  <el-menu :unique-opened="true" default-active="2" :router="true" class="el-menu-vertical-demo">
    <el-submenu v-for="item in menuData" :key="item.id" :index="item.order+''">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
      <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="subitem.path+''">
        <i class="el-icon-tickets"></i>{{subitem.authName}}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuData:[]
    };
  },
  created() {
    this.getMenuData();
  },
  methods: {
    getMenuData() {
      this.$http.get("menus").then(res => {
        const {
          data: {
            data,
            meta: { status }
          }
        } = res;
        if (status === 200) {
          console.log(data);
          this.menuData = data;
        }
      });
    }
  }
};
</script>

<style>
</style>
