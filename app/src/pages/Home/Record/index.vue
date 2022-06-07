  <!-- 出入记录 -->
<template>
  <div>
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="io_type" label="出入类型" width="180">
        <template slot-scope="scope">
          {{ scope.row.io_type == 1 ? "进入" : "离开" }}
        </template>
      </el-table-column>
      <el-table-column prop="car_plate" label="车牌号" width="180">
      </el-table-column>
      <el-table-column prop="io_time" label="出入时间" width="180"> </el-table-column>
      <el-table-column
        label="是否已完成"
        align="left"
        prop="finished"
        :key="Math.random()"
      >
        <template class="serar-header" slot="header">
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
          <el-button type="primary" @click="getRecordByDate" class="search-btn">查询</el-button>
          <el-button  @click="getData" >重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @sendPage="getPage"></Pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Record",
  mounted() {
    this.getData();
  },
  data() {
    return {
      currentPageNo: 1,
      value1:undefined,
      value2:undefined
    };
  },
  methods: {
    getPage(pageNo) {
      this.currentPageNo = pageNo;
      this.getData();
    },
    getData() {
      this.$store.dispatch("getRecord", this.currentPageNo);
    },
    getRecordByDate(){
      if(this.value1>this.value2){
        this.$message({
          message:"起始时间不能大于结束时间",
          type:"error"
        })
        return;
      }
      this.$store.dispatch("getRecordByDate", {start:this.value1,end:this.value2,pageNo:this.currentPageNo});
    }
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.record.tableData;
      },
      total: (store) => {
        return store.record.total;
      },
    }),
  },
};
</script>

<style scoped>
.serar-header {
  background-color: blue;
}

.search-input {
  position: absolute;
  display: inline-block;
  width: 150px;
}
.search-btn{
  margin-left: 360px;
}

</style>