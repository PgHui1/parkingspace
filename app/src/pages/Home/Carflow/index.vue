<!--车流量-->
<template>
  <div id="main">
    <el-date-picker
      class="search-input"
      v-model="value1"
      type="date"
      value-format="yyyy/MM/dd"
      placeholder="起始日期"
    >
    </el-date-picker>
    <el-date-picker
      style="margin-left: 180px"
      class="search-input"
      v-model="value2"
      type="date"
      value-format="yyyy/MM/dd"
      placeholder="结束日期"
    >
    </el-date-picker>
    <el-button class="search-btn" type="primary" @click="getData">查询</el-button>
    <span class="out" id="out"></span>
    <span class="in" id="in"></span>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart  } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

import { mapState } from "vuex";
export default {
  name: "Carflow",
  data() {
    return {
      value1: undefined,
      value2: undefined,
      currentDate: undefined,
      outChart: undefined,
      inChart: undefined,
    };
  },
  mounted() {
    this.value1 = this.value2 = this.getCurrentDate();
    this.outChart = echarts.init(document.getElementById("out"));
    this.inChart = echarts.init(document.getElementById("in"));
    let outOption = {
      title: {
        text: "进入车辆",
      },
      grid: {
        width: "auto",
        height: "auto",
      },
      xAxis: {
        data: [this.value1],
      },
      yAxis: {},
      series: [
        {
          type: "line",
          data: [0],
        },
      ],
    };
    let inOption = {
      title: {
        text: "进入车辆",
      },
      grid: {
        width: "auto",
        height: "auto",
      },
      xAxis: {
        data: [this.value1],
      },
      yAxis: {},
      series: [
        {
          type: "line",
          data: [0],
        },
      ],
    };
    this.outChart.setOption(outOption);
    this.inChart.setOption(inOption);
    this.getData();
  },
  methods: {
    initCharts() {
      let outOption = {
        title: {
          text: "离开车辆",
        },
        grid: {
          width: "auto",
          height: "auto",
        },
        xAxis: {
          data: this.outData[0],
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: this.outData[1],
          },
        ],
      };
      let inOption = {
        title: {
          text: "进入车辆",
        },
        grid: {
          width: "auto",
          height: "auto",
        },
        xAxis: {
          data: this.inData[0],
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: this.inData[1],
          },
        ],
      };
      this.outChart.setOption(outOption);
      this.inChart.setOption(inOption);
    },
    getData() {
      let startDate = Date.parse(this.value1);
      let endDate = Date.parse(this.value2);
      if (startDate > endDate) {
        return 0;
      }
      if (startDate == endDate) {
        return 1;
      }
      let days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      if (this.value1 == undefined || this.value2 == undefined) {
        this.$message({
          message: "时间不能为空",
          type: "error",
        });
      } else if (this.value1 > this.value2) {
        this.$message({
          message: "起始期间不能大于结束时间",
          type: "error",
        });
      } else if (days > 7) {
        this.$message({
          message: "时间间隔不能大于7天",
          type: "error",
        });
      } else {
        this.$store
          .dispatch("getFlow", { start: this.value1, end: this.value2 })
          .then(() => {
            this.initCharts();
          });
      }
    },
    getCurrentDate() {
      let date = new Date();
      let start, end;
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month < 10 ? `0${month}` : month;
      day < 10 ? `0${day}` : day;
      return `${year}/${month}/${day}`;
    },
  },
  computed: {
    ...mapState({
      outData: (store) => {
        return store.carflow.outData;
      },
      inData: (store) => {
        return store.carflow.inData;
      },
    }),
  },
};
</script>

<style scoped>
#main {
  width: auto;
  background-color: white;
}
.out {
  position: absolute;

  display: inline-block;
  box-sizing: border-box;
  margin-top: 39px;
  height: 93%;
  width: 45%;
}

.in {
  display: inline-block;
  box-sizing: border-box;
  margin-top: 39px;
  height: 93%;
  width: 45%;
  position: absolute;
  right: 0;
}

.search-input {
  position: absolute;
  display: inline-block;
  width: 150px;
}

.search-btn {
  position: absolute;
  left: 350px;
}
</style>>
