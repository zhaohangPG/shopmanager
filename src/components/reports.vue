<template>
  <el-card class="box">
    <cru-link level1="数据统计" level2="数据报表"></cru-link>
    <div class="echarts" id="main"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$http.get("reports/type/1").then(res => {
      console.log(res);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      const option1 = data;

      var myChart = echarts.init(document.getElementById("main"));
      const option2 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      const option = { ...option1, ...option2 };
      myChart.setOption(option);
    });
  }
};
</script>

<style>
.box {
  height: 100%;
}
.echarts {
  width: 600px;
  height: 400px;
}
</style>
