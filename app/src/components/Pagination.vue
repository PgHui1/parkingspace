<template>
  <el-pagination
        small
        layout="prev, pager, next"
        :page-size="8"
        :total="this.total"
        @current-change="handleCurrentChange">
    </el-pagination>
</template>

<script>
export default {
    props:["total"],
    methods:{
      handleCurrentChange(a){
        this.$emit("sendPage",a);
      }
    }
}
</script>

<style>
.el-pagination{
  position: absolute;
  right: 50%;
  margin-top: 20px;
}
</style>