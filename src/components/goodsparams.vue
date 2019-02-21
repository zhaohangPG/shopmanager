<template>
  <el-card class="box">
    <cru-link level1="商品管理" level2="分类参数"></cru-link>
    <el-alert title="请选择三级分类" type="warning" show-icon class="alert"></el-alert>
    {{selectedOptions}}
    <el-cascader
      expand-trigger="hover"
      clearable
      :options="goods_cat"
      :props="optionsObj"
      v-model="selectedOptions"
      @change="handleChange"
    ></el-cascader>
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <el-table :data="arrDri" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!-- <span v-for="(item,i) in scope.row.attr_vals" :key="i">
                      {{item}}
              </span>-->
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row)"
              >{{tag}}</el-tag>
              {{inputValue}}
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm"
              ></el-input>

              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="#" prop="attr_id"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-table :data="arrSta" style="width: 100%">
          <el-table-column label="#" prop="attr_id"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  created() {
    this.getCateData();
  },
  data() {
    return {
      active: "1",
      optionsObj: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      selectedOptions: [],
      goods_cat: [],
      arrDri: [],
      arrSta: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      //   console.log(tag);
      tag.attr_vals.splice(tag.attr_vals.indexOf(tag), 1);
      //   console.log(tag);
      this.$http
        .put(
          `categories/${this.selectedOptions[2]}/attributes/${tag.attr_id}`,
          {
            attr_name: tag.attr_name,
            attr_vals: tag.attr_vals.join(","),
            attr_sel: tag.attr_sel
          }
        )
        .then(res => {
          const {
            data: {
              data,
              meta: { msg, status }
            }
          } = res;
          if (status === 200) {
            this.$message.success(msg);
          }
        });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(tag) {
      let inputValue = this.inputValue;
      if (inputValue) {
        //   console.log(tag.attr_vals);
        tag.attr_vals.push(inputValue);
        this.$http
          .put(
            `categories/${this.selectedOptions[2]}/attributes/${tag.attr_id}`,
            {
              attr_name: tag.attr_name,
              attr_vals: tag.attr_vals.join(","),
              attr_sel: tag.attr_sel
            }
          )
          .then(res => {
            const {
              data: {
                data,
                meta: { msg, status }
              }
            } = res;
            if (status === 200) {
              this.$message.success(msg);
              this.inputVisible = false;
              this.inputValue = "";
            }
          });
      }
      console.log(tag.attr_vals);

      //   console.log(tag);
    },
    handleClick() {
      if (this.active == 2) {
        if (this.selectedOptions.length !== 3) {
          this.arrSta = [];
          this.$message.warning("请先设置三级分类");
          return;
        }
        console.log("切换成功");
        this.$http
          .get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          .then(res => {
            console.log(res);
            const {
              data: {
                data,
                meta: { msg, status }
              }
            } = res;
            if (status === 200) {
              this.arrSta = data;
              console.log(data);
            }
          });
      }
    },
    getCateData() {
      this.$http.get("categories").then(res => {
        const {
          data: {
            data,
            meta: { msg, status }
          }
        } = res;
        if (status === 200) {
          this.goods_cat = data;
          //   console.log(res);
        }
      });
    },
    handleChange() {
      if (this.active == 2) {
        this.$http
          .get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          .then(res => {
            console.log(res);
            const {
              data: {
                data,
                meta: { msg, status }
              }
            } = res;
            if (status === 200) {
              this.arrSta = data;
              console.log(data);
            }
          });
      }
      this.$http
        .get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        .then(res => {
          console.log(res);
          const {
            data: {
              data,
              meta: { msg, status }
            }
          } = res;
          this.arrDri = data;
          this.arrDri.forEach(item => {
            item.attr_vals = item.attr_vals.split(",");
          });
          console.log(data);
        });
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.alert {
  margin: 10px;
}
</style>
