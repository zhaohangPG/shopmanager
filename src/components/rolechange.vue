<template>
  <el-card class="boxcard">
    <cru-link level1="权限管理" level2="角色列表"></cru-link>
    <el-collapse v-model="activeName" accordion class="spread" @change="showRights">
      <el-collapse-item
        v-for="item in roleList"
        :key="item.id"
        :title="item.roleName"
        :name="item.id"
        class="sheet"
      >
        <div v-for="rightL1 in item.children" :key="rightL1.id" class="fl">
          <el-tag closable type="success" @close="deleRights(rightL1.id)">{{rightL1.authName}}</el-tag>
          <div v-for="rightL2 in rightL1.children" :key="rightL2.id" class="fl">
            <el-tag closable type="warning" @close="deleRights(rightL2.id)">{{rightL2.authName}}</el-tag>
            <div v-for="rightL3 in rightL2.children" :key="rightL3.id" class="fl">
              <el-tag closable @close="deleRights(rightL3.id)">{{rightL3.authName}}</el-tag>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  created() {
    this.getRoles();
  },
  data() {
    return {
      activeName: 1,
      roleList: []
    };
  },
  methods: {
    showRights(val) {
      console.log(val);
    },
    deleRights(rightID) {
      console.log(rightID, this.activeName);

      this.$http.delete(`roles/${this.activeName}/rights/${rightID}`)
      .then(res=>{
          console.log(res);
          const {
              data:{
                  meta:{
                      msg,status
                  }
              }
          }=res;
          if (status === 200) {
              this.$message.success(msg);
              this.getRoles();
          }
      })
    },
    getRoles() {
      this.$http.get("roles").then(res => {
        const {
          data: { data }
        } = res;
        this.roleList = data;
      });
    }
  }
};
</script>

<style>
.boxcard {
  height: 100%;
}
.spread {
  margin-top: 20px;
}
.sheet {
  /* height: 400px; */
}
.fl {
  float: left;
}
</style>
