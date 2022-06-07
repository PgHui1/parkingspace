<template>
  <el-main class="main">
    <h2>欢迎使用车位管理系统,当前时间为{{ dateFormat(time) }}</h2>
    <div v-if="showPage">
      今日{{ type }},最低气温为{{ low }},最高气温为:{{ high }},当前气温为{{
        weather.wendu
      }}℃,
      {{ weather.ganmao }}
    </div>
    <div>当前剩余车位数量为{{number}}</div>
  </el-main>
</template>

<script>
import {reqGetCount} from "@/api/index.js"
export default {
  props: ["weather"],
  data() {
    return {
      time: null,
      showPage:false,
      number:undefined
    };
  },
  mounted() {
    setInterval(this.updateTime, 1000);
    if(this.weather){
      this.showPage=true
    }
    reqGetCount()
    .then((number)=>{
      this.number=number
    })
  },
  methods: {
    updateTime() {
      this.time = new Date();
    },
    dateFormat() {
      var date = new Date();
      var year = date.getFullYear();

      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let week = date.getDay(); // 星期
      let weekArr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      // 拼接 时间格式处理
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        weekArr[week]
      );
    },
  },
  computed: {
    type(){
      return this.weather.forecast[0].type || {};
    },
    low() {
      return this.weather.forecast[0].low.split(" ")[1] || 0;
    },
    high() {
      return this.weather.forecast[0].high.split(" ")[1] || 0;
    },
  },
};
</script>

<style scoped>
.el-main {
  position: absolute;
  top: 110px;
  left: 320px;
  right: 20px;
  height: 260px;
  background-color: white;
}
</style>