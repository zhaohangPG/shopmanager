<template>
  <el-card class="box-card">
    <cru-link level1="权限管理" level2="权限列表"></cru-link>
    <el-table :data="tableData" style="width: 100%" height="500px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="权限ID" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="360"></el-table-column>
      <el-table-column label="权限级别">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  created() {
    this.$http.get("rights/list").then(res => {
      const {
        data: { data }
      } = res;
      console.log(data);
      this.tableData = data;
    });
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
</style>
