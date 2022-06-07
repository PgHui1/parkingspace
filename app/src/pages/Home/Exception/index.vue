  <!-- 异常信息 -->
<template>
  <div>
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column
        prop="car_plate"
        label="车牌"
        width="180"
      ></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="parking_place" label="车位"></el-table-column>
      <el-table-column prop="error_time" label="异常时间"></el-table-column>
      <el-table-column prop="is_dealt" label="处理状态">
        <template slot-scope="scope">
          {{ scope.row.is_dealt == 1 ? "已处理" : "未处理" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="这条记录已经处理完毕了吗(隐藏)？"
            confirm-button-text="是的"
            cancel-button-text="否"
            icon="el-icon-info"
            icon-color="red"
            @confirm="handlerEdit(scope.$index, scope.row)"
          >
            <el-button
              :disabled="scope.row.is_dealt == 1"
              slot="reference"
              size="mini"
              type="primary"
            >
              处理</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @sendPage="getPage"></Pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Exception",
  mounted() {
    this.getData();
   
  },
  data() {
    return {
      form: {
        name: undefined,
        car_plate: undefined,
        phone: undefined,
        parking_place: undefined,
        error_time: undefined,
        is_dealt: undefined,
      },
      currentPageNo: 1,
    };
  },
  methods: {
    getPage(pageNo) {
      this.currentPageNo = pageNo;
      this.getData();
    },
    getData() {
      this.$store.dispatch("getException", this.currentPageNo);
    },
    handleDelete(index, row) {
      this.$store
        .dispatch("deleteException", row.car_plate)
        .then((state) => {
          if (state == "succeed") {
            this.$message({
              message: "成功",
              type: "success",
            });
            this.getData();
          } else {
            if (state == "succeed") {
              this.$message({
                message: "失败",
                type: "error",
              });
            }
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
    handlerEdit(index, row) {
      this.$store
        .dispatch("updateException", row.car_plate)
        .then((state) => {
          if (state == "succeed") {
            this.$message({
              message: "成功",
              type: "success",
            });
            row.is_dealt = 1;
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.exception.tableData;
      },
      total: (store) => {
        return store.exception.total;
      },
    }),
  },
};
</script>

<style>
</style>