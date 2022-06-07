 <!-- 占用情况 -->
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: auto"
    >
      <el-table-column prop="place" label="车位" width="180"> </el-table-column>

      <el-table-column label="使用情况" width="180">
        <template slot-scope="scope">
          {{ scope.row.is_occupied == "1" ? "使用中" : "未使用" }}
        </template>
      </el-table-column>
      <el-table-column prop="car_plate" width="120" label="车牌">
      </el-table-column>

      <el-table-column align="left" width="500" :key="Math.random()">
        <template slot="header">
          指定车位查询:
          <el-select
            size="small"
            v-model="value"
            placeholder="请选择"
            @change="oneParking"
          >
            <el-option
              v-for="(item, index) in allPlace"
              :key="index"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-button class="reset" size="small" @click="getPage(1)"
            >重置</el-button
          >
        </template>
      </el-table-column>

      <el-table-column align="center">
        <template slot="header">
          <el-button
            size="small"
            @click="$store.dispatch('unUsed')"
            type="primary"
            >查询未使用车位</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 给子组件绑定一个sendPage方法,用来向父组件传递页码信息 -->
    <Pagination :total="total" @sendPage="getPage"></Pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Occupancy",
  props: ["allPlace"],
  data() {
    return {
      value: null,
      currentPage: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getPage(pageNo) {
      this.currentPage = pageNo;
      this.getData();
    },
    oneParking(place) {
      this.$store.dispatch("oneParking", place);
    },
    getData() {
      this.$store.dispatch("allParking", this.currentPage);
    },
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.occupancy.tableData;
      },
      total: (store) => {
        return store.occupancy.total;
      },
    }),
  },
  watch: {
    allPlace: {
      handler(a, b) {
        this.$nextTick(function(){
          return a;
        })
      },
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100px;
}

.reset {
  margin-left: 10px;
}
</style>