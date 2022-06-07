  <!-- 临时车位 -->
<template>
  <div id="main">
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="parking_time" label="使用时长(小时)" width="180">
      </el-table-column>
      <el-table-column prop="car_plate" label="车牌" width="180">
      </el-table-column>
      <el-table-column prop="end_time" label="离开时间" width="180">
      </el-table-column>
      <el-table-column prop="end_type" label="状态" >
        <template slot-scope="scope">
          {{ scope.row.end_type == "0" ? "使用中" : "已离开" }}
        </template>
      </el-table-column>
      <el-table-column prop="place" label="车位" width="120"> </el-table-column>
      <el-table-column align="left" :key="Math.random()" width="450">
      <template slot="header">
          <el-button size="small" @click="openDialog">添加记录</el-button>
          <el-button size="small" @click="getPage(1)">重置</el-button>
          <el-button size="small" type="primary" @click="searchByPlate">车牌查询</el-button>
          <el-input size="small" style="width:100px;margin-left:14px" @click="searchByPlate"  v-model="plate"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.end_type==1"
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确认要删除这条记录吗？"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger">
              删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="this.total" @sendPage="getPage"></Pagination>
    <el-dialog
      :title="form.title"
      width="400px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-press-escape="false"
      center
    >
      <el-form class="dialog-form" :model="form" :rules="rules" ref="form" center>
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input
            :disabled="flag == 1"
            v-model="form.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="使用时长"
          prop="parking_time"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="flag == 1"
            v-model="form.parking_time"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="车牌"
          prop="car_plate"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.car_plate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="离开时间"
          prop="end_time"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.end_time"
            type="datetime"
            :disabled="flag == 1"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="end_type"
          label="状态"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.end_type" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车位" prop="place" :label-width="formLabelWidth">
          <el-input v-model.number="form.place" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="flag == 1" @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="updateTemp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name:"Tempparking",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        title: undefined,
        name: undefined,
        phone: undefined,
        parking_time: undefined,
        car_plate: undefined,
        end_time: undefined,
        end_type: undefined,
        place: undefined,
      },
      tempForm:{},
      formLabelWidth: "120px",
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        car_plate: [
          { required: true, message: "车牌不能为空", trigger: "blur" },
        ],
        parking_time:[{
          required: true, message: "使用时长不能为空", trigger: "blur"
        }],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ],
      },
      options: [{ value: "使用中" }, { value: "已离开" }],
      flag: 0,
      currentPageNo: 1,
      plate:""
    };
  },
  mounted() {
    this.$store.dispatch("getAllTemp", 1);
  },
  methods: {
    getPage(pageNo) {
      this.currentPageNo = pageNo;
      this.getData();
    },
    handleEdit(index, row) {
      this.form.title = "更新临时停车记录";
      this.form.name = row.name;
      this.form.phone = row.phone;
      this.form.parking_time = row.parking_time;
      this.form.car_plate = row.car_plate;
      this.form.end_time = row.end_time;
      this.form.end_type = row.end_type == 0 ? "使用中" : "已离开";
      this.form.place = row.place;
      this.flag = 1;
      this.dialogFormVisible = true;
      this.copyObj();
    },
    handleDelete(idnex, row) {
      this.$store
        .dispatch("deleteTemp", row.name)
        .then((state) => {
          if (state == "succeed") {
            this.$message({
              message: "成功",
              type: "success",
            });
              this.closeDialog();
              this.getData();
          } else {
            this.$message({
              message: "失败",
              type: "error",
            });
          }
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
        });
    },
    handleClose(done) {
      this.$refs['form'].clearValidate();
      done();
    },
    updateTemp() {
      /* 1表示更新操作 */
      if (this.flag == 1) {
        this.$store
          .dispatch("updateTemp", this.form)
          .then((state) => {
            if (state == "succeed") {
              this.$message({
                message: "成功",
                type: "success",
              });
              this.closeDialog();
              this.getData();
            } else {
              this.$message({
                message: "失败",
                type: "error",
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error,
              type: "error",
            });
          });
      } else if (this.flag == 2) {
        /* 2表示插入操作 */
        this.$store
          .dispatch("addTemp", this.form)
          .then((state) => {
            if (state == "succeed") {
              this.$message({
                message: "成功",
                type: "success",
              });
              this.closeDialog();
              this.getData();
            } else {
              this.$message({
                message: "该车位占用中",
                type: "error",
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error,
              type: "error",
            });
          });
      } else {
        this.$message({
          message: "出现错误,请刷新后重试",
          type: "error",
        });
        return;
      }
    },
    searchByPlate(){
      this.$store.dispatch("getOneTemp",this.plate)
      .catch((error)=>{
        this.$message({
          message:error,
          type:"error"
        })
      })
    },
    openDialog() {
      this.form.name = undefined;
      this.form.phone = undefined;
      this.form.parking_time = undefined;
      this.form.car_plate = undefined;
      this.form.end_time = undefined;
      this.form.end_type = undefined;
      this.form.place = undefined;
      this.form.title = "添加临时停车记录";
      this.flag = 2;
      this.dialogFormVisible = true;
      this.copyObj();
    },
    closeDialog(){
      this.dialogFormVisible = false;
    },
    getData() {
      this.$store.dispatch("getAllTemp", this.currentPageNo);
    },
    copyObj(){
      this.tempForm = JSON.parse(JSON.stringify(this.form));
    },
    resetForm() {
      this.form = JSON.parse(JSON.stringify(this.tempForm));
    },
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.tempparking.tableData;
      },
      total: (store) => {
        return store.tempparking.total;
      },
    }),
  },
};
</script>

<style>

.main{
  position: relative;
}

.search{
  
}
</style>