<template>
  <el-card class="boxcard">
    <cru-link level1="权限管理" level2="角色列表"></cru-link>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="lev1 in scope.row.children" :key="lev1.id" class="lev1">
            <el-col :span="4">
              <el-tag closable @close="deleRights(lev1.id,scope.row)">{{lev1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="lev2 in lev1.children" :key="lev2.id" class="lev2">
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="deleRights(lev2.id,scope.row)"
                    type="success"
                  >{{lev2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    @close="deleRights(lev3.id,scope.row)"
                    type="warning"
                    v-for="lev3 in lev2.children"
                    :key="lev3.id"
                  >{{lev3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色 ID" prop="id" width="80"></el-table-column>
      <el-table-column label="角色名" prop="roleName" width="260"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" width="260"></el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="editRoleShow(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="delRoleShow(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="changeRightsShow(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色授权对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-tree
      ref="treeDom"
        :data="rightList"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkId"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightEditCommit()">确 定</el-button>
      </span>
    </el-dialog>
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
      roleList: [],
      rightList: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogVisible: false,
      checkId: [],
      changeRoleId:-1
    };
  },
  methods: {
    showRights(val) {
      // console.log(val);
    },
    deleRights(rightID) {
      // console.log(rightID, this.activeName);

      this.$http
        .delete(`roles/${this.activeName}/rights/${rightID}`)
        .then(res => {
          // console.log(res);
          const {
            data: {
              meta: { msg, status }
            }
          } = res;
          if (status === 200) {
            this.$message.success(msg);
            this.getRoles();
          }
        });
    },
    getRoles() {
      this.$http.get("roles").then(res => {
        const {
          data: { data }
        } = res;
        // console.log(res);
        // console.log(data);
        this.roleList = data;
      });
      // console.log(data)
    },
    editRoleShow() {},
    delRoleShow() {},
    changeRightsShow(role) {
      // console.log(role);
      this.changeRoleId = role.id;
      this.dialogVisible = true;
      this.$http.get("rights/tree").then(res => {
        // console.log("打开对话框");
        const {
          data: {
            data,
            meta: { status, msg }
          }
        } = res;
        if (status === 200) {
          // console.log(data);
          this.rightList = data;
          let temp = [];
          role.children.forEach(item => {
            item.children.forEach(item1 => {
              item1.children.forEach(item2 => {
                temp.push(item2.id);
              });
            });
          });
          this.checkId = temp;
        }
      });
    },
    deleRights(rightID, role) {
      // console.log(rightID, roleID);
      this.$http.delete(`roles/${role.id}/rights/${rightID}`).then(res => {
        const {
          data: {
            data,
            meta: { status, msg }
          }
        } = res;
        if (status === 200) {
          this.$message.success(msg);
          role.children = data;
        }
      });
    },
    rightEditCommit(){
      // console.log(this.$refs.treeDom);
      let arrChecked = this.$refs.treeDom.getCheckedKeys();
      let arrHalfChecked = this.$refs.treeDom.getHalfCheckedKeys();
      let checkedId = [...arrChecked,...arrHalfChecked];
      // console.log(checkedId);
      this.$http.post(`roles/${this.changeRoleId}/rights`,{
        rids: checkedId.join(',')
      })
      .then(res=>{
        // console.log(res);
        const {
          data: {
            data,
            meta: { status, msg }
          }
        } = res;
        console.log(res);
        if (status === 200) {
          this.$message.success(msg);
          this.dialogVisible = false;
        }
      })
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
.lev1 {
  /* margin-top: 10px; */
}
.lev2 {
  /* margin-top: 10px; */
}
</style>
