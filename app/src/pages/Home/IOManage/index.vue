<template>
  <div>
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="car_plate" label="车牌" width="180">
      </el-table-column>
      <el-table-column prop="zone" label="途径区域" width="180"> </el-table-column>
      <el-table-column prop="level" label="风险等级"> </el-table-column>
      <el-table-column label="经过日期"> 
        <template slot-scope="scope">{{scope.row.create_time.slice(0,10)}} </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button size="small" @click="openDialog" type="primary"
            >添加记录</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
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
    <Pagination :total="total" @sendPage="getPage"></Pagination>
    <el-dialog
      :title="form.title"
      width="300px"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      :close-on-press-escape="false"
      center
    >
      <el-form
        class="dialog-form"
        :model="form"
        :rules="rules"
        ref="form"
        center
      >
        <el-form-item
          label="车牌"
          prop="car_plate"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.car_plate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="途径区域"
          prop="zone"
          :label-width="formLabelWidth"
        >
          <el-input :disabled="flag == 1" v-model="form.zone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="level" label="风险等级"  :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="flag == 1" @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="updateIO">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name:"IOManage",
  mounted(){
    this.$store.dispatch("getioMSelList",1);
  },
  data(){
    return {
      rules: {
        car_plate: [
          { required: true, message: "车牌不能为空", trigger: "blur" },
        ],
        zone: [
          { required: true, message: "途径区域不能为空", trigger: "blur" }
        ]
      },
      options:[
        {
          id:1,
          value:"高"
        },
        {
          id:2,
          value:"中"
        }
      ],
      value:undefined,
      value1:undefined,
      form:{
        id:undefined,
        car_plate:undefined,
        create_time:undefined,
        zone:undefined,
        level:undefined
      },
      tempForm:{
        id:undefined,
        car_plate:undefined,
        create_time:undefined,
        zone:undefined,
        level:undefined
      },
      flag:0,
      dialogFormVisible:false,
      formLabelWidth: "120px",
      currentPageNo:1
    }
  },
  methods:{
  getPage(pageNo) {
      this.currentPageNo = pageNo;
      this.getData();
    },
    handleEdit(index, row) {
      this.form.title = "更新禁入信息";
      this.form.id = row.id;
      this.form.car_plate = row.car_plate;
      this.form.zone = row.zone;
      this.form.level = row.level;
      this.value = row.level;
      this.form.place = row.place;
      this.flag = 1;
      this.dialogFormVisible = true;
      this.copyObj();
    },
    handleDelete(idnex, row) {
      this.$store
        .dispatch("deleteioMSelList", row.id)
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
    updateIO() {
      /* 1表示更新操作 */
      if (this.flag == 1) {
        this.$store
          .dispatch("updateioMSelList",{id:this.form.id,car_plate:this.form.car_plate})
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
          .dispatch("insertioMSelList", {zone:this.form.zone,level:this.value,car_plate:this.form.car_plate})
          .then((state) => {
            if (state == "successed") {
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
      this.form.id = undefined;
      this.form.car_plate = undefined;
      this.form.create_time = undefined;
      this.form.zone = undefined;
      this.form.level = undefined;
      this.form.title = "添加禁入信息";
      this.flag = 2;
      this.dialogFormVisible = true;
      this.copyObj();
    },
    closeDialog(){
      this.dialogFormVisible = false;
    },
    getData() {
      this.$store.dispatch("getioMSelList", this.currentPageNo);
    },
    copyObj(){
      this.tempForm = JSON.parse(JSON.stringify(this.form));
    },
    resetForm() {
      this.form = JSON.parse(JSON.stringify(this.tempForm));
    }
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.iomanage.tableData;
      },
      total: (store) => {
        return store.iomanage.total;
      },
    }),
  },
};
</script>

<style scoped>
.dialog-form {
  position: relative;
  left: -40px;
}
</style>