<template>
  <el-card class="addCard">
    <el-steps :active="active*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="top" label-width="80px" :model="addForm" class="addform">
      <el-tabs tab-position="left" v-model="active" @tab-click="tabChange">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              expand-trigger="hover"
              clearable
              :options="goods_cat"
              :props="optionsObj"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item.attr_name" v-for="item in arrDri" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals" @change="dataChange">
              <el-checkbox
                class="checkbox"
                v-for="item2 in item.attr_vals"
                :key="item2"
                :label="item2"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item.attr_name" v-for="item in arrSta" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            multiple
            action="http://localhost:8888/api/private/v1/upload"
            :headers="uploadObj"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <quill-editor
            v-model="addForm.goods_introduce"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
          <el-button type="primary" @click="goodsSubmit" class="addSubmit">添加提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// goods_name	商品名称	不能为空
// goods_cat	以为','分割的分类列表	不能为空
// goods_price	价格	不能为空
// goods_number	数量	不能为空
// goods_weight	重量	不能为空
// goods_introduce	介绍	可以为空
// pics	上传的图片临时路径（对象）	可以为空
// attrs	商品的参数（数组）	可以为空

export default {
  components: {
    quillEditor
  },
  created() {
    this.$http.get("categories").then(res => {
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        this.goods_cat = data;
        const AUTH_TOKEN = localStorage.getItem("token");
        // config.headers["Authorization"] = AUTH_TOKEN;
        this.uploadObj = {
          Authorization: AUTH_TOKEN
        };
      }
    });
  },
  data() {
    return {
      active: "1",
      addForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      selectedOptions: [],
      goods_cat: [],
      optionsObj: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      arrDri: [],
      arrSta: [],
      checkList: [],
      uploadObj: {},
      editorOption: {}
    };
  },
  methods: {
    dataChange() {
      console.log(this.arrDri);
    },
    handleChange() {
      console.log(this.selectedOptions);
    },
    tabChange() {
      console.log(this.active);
      if (this.active == 2 || this.active == 3) {
        if (this.selectedOptions.length !== 3) {
          this.$message.error("请先设置三级分类");
          if (this.active == 2) {
            this.arrDri = [];
          } else if (this.arrSta == 3) {
            this.arrSta = [];
          }
          return;
        }
        if (this.active == 2) {
          if (this.arrDri.length === 0) {
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
              });
          }
        } else if (this.active == 3) {
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
              }
            });
        }
      }
    },
    handleRemove(file) {},
    handleSuccess(response) {
      const {
        data: { tmp_path },
        meta: { msg, status }
      } = response;
      this.addForm.pics.push = {
        pic: tmp_path
      };
    },
    goodsSubmit() {
      console.log("添加提交");
      let tmp = this.selectedOptions;
      this.addForm.goods_cat = tmp.join(",");

      this.arrDri.forEach(item => {
        let tmp = item.attr_vals.join(",");
        this.addForm.attrs.push({
          attr_id: item.attr_id,
          attr_value: tmp
        });
      });
      this.arrSta.forEach(item => {
        this.addForm.attrs.push({
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        });
      });

      console.log(this.addForm.attrs);

      this.$http.post("goods", this.addForm).then(res => {
        const {
          data: {
            data,
            meta: { msg, status }
          }
        } = res;
        console.log(res);
        if (status === 201) {
          this.$message.success(msg);
          this.$router.push("goods");
        }
      });
    }
  }
};
</script>

<style>
.addform {
  height: 500px;
  overflow: auto;
}
.addCard {
  height: 100%;
}
.checkbox {
  border: 1px solid #409eff;
  padding: 4px 10px;
  border-radius: 3px;
}
.ql-editor {
  min-height: 300px;
}
.addSubmit {
  margin-top: 10px;
}
</style>
