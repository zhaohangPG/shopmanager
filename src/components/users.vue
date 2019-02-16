<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="query" class="inputSear" clearable @clear="searchClr()">
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <el-button type="success" @click="addFormVisble = true">添加用户</el-button>
    <el-table :data="list" style="width: 100%" class="dataTable">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" width="80"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <!-- 日期格式化 -->
      <el-table-column label="创建日期" width="140">
        <template slot-scope="scope">{{ scope.row.create_time | fmtdate }}</template>
      </el-table-column>
      <!-- 状态处理 -->
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="statusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain
            @click="editFormShow(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain
            @click="delShow(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain
            @click="showRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加弹出层 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisble" label-position="left">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisble = false">取 消</el-button>
        <el-button type="primary" @click="addFormCommit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出层 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisble" label-position="left">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisble = false">取 消</el-button>
        <el-button type="primary" @click="editFormCommit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹出层 -->
    <el-dialog title="提示" :visible.sync="delVisble" width="30%" center>
      <span>确认删除用户{{delName}}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisble = false">取 消</el-button>
        <el-button type="primary" @click="delSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色授权弹出层 -->
    <el-dialog title="角色授权管理" :visible.sync="roleVisble">
      <el-form :model="editForm">
        <el-form-item label="用户名">{{userRole}}</el-form-item>
        <!-- {{selectVal}} -->
        <el-form-item label="授权角色">
          <el-select v-model="selectVal" placeholder="请选择活动区域">
            <el-option label="请选择角色" :value="-1" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleVisble = false">取 消</el-button>
        <el-button type="primary" @click="roleSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog title="提示" :visible.sync="roleVisble" width="30%" center>
      <span>请确认授权角色</span>
      <el-row>
        <el-col>
          <span>当前用户角色为{{userRole}}</span>
        </el-col>
      </el-row>
      <el-dropdown size="small" split-button type="primary" @command="roleHandle">
        <span class="el-dropdown-link">{{roleSel}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            :command="item.roleName"
            v-for="item in roleList"
            :key="item.id"
          >{{ item.roleName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisble = false">取 消</el-button>
        <el-button type="primary" @click="roleSubmit()">确 定</el-button>
      </span>
    </el-dialog>-->
  </el-card>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 4,
      list: [],
      total: 0,
      addFormVisble: false,
      editFormVisble: false,
      delVisble: false,
      roleVisble: false,
      addForm: {
        email: "",
        username: "",
        password: "",
        mobile: ""
      },
      editForm: {},
      delID: 0,
      delName: "",
      userRole: "",
      roleList: [],
      selectVal: -1,
      userId: -1
    };
  },
  methods: {
    search() {
      console.log("搜索按钮点击");
      this.pagenum = 1;
      this.getData();
    },
    searchClr() {
      this.getData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getData();
    },
    getData() {
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
            this.pagesize
          }`
        )
        .then(res => {
          const {
            data: {
              data: { users, total },
              meta: { status }
            }
          } = res;
          this.total = total;
          if (status === 200) {
            this.list = users;
          }
        });
    },
    addFormCommit() {
      console.log(this.addForm);
      this.$http.post("users", this.addForm).then(res => {
        console.log(res);
        const {
          data: {
            meta: { msg, status }
          }
        } = res;
        if (status === 201) {
          this.$message.success(msg);
          this.addFormVisble = false;
          this.getData();
        } else {
          this.$message.warning(msg);
        }
      });
    },
    statusChange(user) {
      console.log(user);
      this.$http.put(`users/${user.id}/state/${user.mg_state}`).then(res => {
        console.log(res);
        const {
          data: {
            meta: { msg, status }
          }
        } = res;
        if (status === 200) {
          this.$message.success(msg);
          this.getData();
        } else {
          this.$message.warning(msg);
        }
      });
    },
    editFormShow(user) {
      this.editFormVisble = true;
      console.log(user);
      this.editForm = user;
    },
    editFormCommit() {
      this.$http.put(`users/${this.editForm.id}`, this.editForm).then(res => {
        console.log(res);
        const {
          data: {
            meta: { msg, status }
          }
        } = res;
        if (status === 200) {
          this.$message.success(msg);
          this.editFormVisble = false;
          this.getData();
        } else {
          this.$message.warning(msg);
        }
      });
    },
    delShow(user) {
      console.log(user.id);
      this.delID = user.id;
      this.delName = user.username;
      this.delVisble = true;
    },
    delSubmit() {
      this.$http.delete(`users/${this.delID}`).then(res => {
        const {
          data: {
            meta: { msg, status }
          }
        } = res;
        if (status === 200) {
          this.delVisble = false;
          this.$message.success(msg);
          this.getData();
        } else {
          this.$message.warning(msg);
        }
      });
    },
    showRole(user) {
      this.userRole = user.username;
      this.selectVal = user.role_name;
      this.userId = user.id;
      this.roleVisble = true;
      this.$http.get("roles").then(res => {
        console.log(res);
        const {
          data: { data }
        } = res;
        console.log(data);
        this.roleList = data;
      });
    },
    roleSubmit() {
      // this.$message.warning(cmd);
      
      this.$http
        .put(`users/${this.userId}/role`, {
          rid: this.selectVal
        })
        .then(res => {
          console.log(res);
          const {
            data: {
              meta: { msg, status }
            }
          } = res;
          if (status === 200) {
            this.$message.success(this.userRole + msg);
            this.roleVisble = false;
            this.getData();
          }else {
            this.$message.warning(msg);
          }
        });
      
    }
  }
};
</script>

<style>
.dataTable {
  margin-top: 20px;
}
.card {
  height: 100%;
}
.inputSear {
  margin-top: 20px;
  width: 500px;
}
.pagenation {
  margin-top: 20px;
}
</style>
