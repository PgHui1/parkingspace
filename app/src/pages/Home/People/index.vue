<template>
  <div>
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="car_plate" label="车牌" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="parking_space" label="车位"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <el-button size="small" @click="openDialog" type="primary"
            >新增人员</el-button
          >
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
    <Pagination :total="this.total"></Pagination>
    <el-dialog
      title="业主信息"
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
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="车牌"
          prop="car_plate"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.car_plate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="车位"
          prop="parking_space"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.parking_space" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="flag == 1" @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="updatePeople">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name:"People",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name:"",
        car_plate:"",
        parking_space:"",
        phone:"",
      },
      tempForm:{},
      formLabelWidth: "120px",
      rules: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },      
          ],
          car_plate: [
            { required: true, message: '车牌不能为空', trigger: 'blur' }
          ],
          parking_space: [
            {  required: true, message: '车位不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ]
        },
        flag:0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleEdit(a, b) {
      this.form.name = b.name;
      this.form.car_plate = b.car_plate;
      this.form.parking_space = b.parking_space;
      this.form.phone = b.phone;
      this.dialogFormVisible = true;
      this.flag =1;
      this.copyObj();
    },
    updatePeople() {
      if(this.flag ==1){
        this.$store.dispatch("updatePeople",this.form)
        .then((state) => {
            if (state == "succeed") {
              this.$message({
                message: "成功",
                type: "success",
              });
              this.closeDialog()
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
      }else if(this.flag ==2){
        this.$store.dispatch("addPeople",this.form)
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
      }
    },
    handleDelete(a,b) {
      this.$store.dispatch("deletePeople",b.name)
      .then((state) => {
            if (state == "succeed") {
              this.$message({
                message: "成功",
                type: "success",
              });
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
    handleClose(done){
      this.$refs['form'].clearValidate();
      done();
    },
    openDialog(){
      this.form.name = undefined;
      this.form.car_plate = undefined;
      this.form.parking_space = undefined;
      this.form.phone = undefined;
      this.dialogFormVisible = true;
      this.flag =2;
      this.copyObj();
    },
    closeDialog(){
      this.dialogFormVisible = false;
    },
    getData(){
       this.$store.dispatch("peopleInfo");
    },
    copyObj(){
      this.tempForm = JSON.parse(JSON.stringify(this.form));
    },
    resetForm(props){
      this.form = JSON.parse(JSON.stringify(this.tempForm));
    }
  },
  computed: {
    ...mapState({
      tableData: (store) => {
        return store.people.tableData;
      },
      total: (store) => {
        return store.people.total;
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