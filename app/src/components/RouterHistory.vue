<template>
  <el-container class="router-history">
    <ul class="container">
      <li :class="{'actived':$route.path=='/home/welcome'}">
        <div class="router-item">
          <i class="iconfont icon-point"></i>
          <span @click="routerJump('/home/welcome')">
            首页</span>
          </div>
      </li>
      <li v-for="(router,index) in routerList" :key="index" :class="{'actived':router.path == $route.path}">
        <div class="router-item">
          <i class="iconfont icon-point"></i>
          <span @click="routerJump(router.path)">
            {{router.routerName}}</span>
           <i class="el-icon-close" @click="returenRoute(index)"></i>
          </div>
      </li>
    </ul>
  </el-container>
</template>

<script>
export default {
    data(){
      return {
        routerList:[
          /* {
            routerName: "车位占用情况",
            path: "/home/occupancy"
          } */
        ]
      }
    },
    methods:{
      routerJump(path){
        this.$router.push(path);
      },
      returenRoute(index){
        if(this.routerList.length==1){
          this.routerList.splice(index,1);
          this.$router.push("/home/welcome");
          return;
        }
        if(index+1 < this.routerList.length){
          this.routerList.splice(index,1);
          this.$router.push(this.routerList[index].path) 
        }else{
          this.routerList.splice(index,1);
          this.$router.push(this.routerList[index-1].path) 
        } 
      }
    },
    watch: { 
      $route: {
          handler (to, from){
            /* 标志位 1说明当前点击的路由需要添加 */
            if(this.$route.path=="/home" || this.$route.path=="/" ||this.$route.path=="/home/welcome"){
              return;
            }
            let flag = 1;
              for(let i=0;i<this.routerList.length;i++){
                if(this.$route.path === this.routerList[i].path){
                  flag =0;
                  break;
                }
              }
              if(flag){
                let obj = {
                  routerName:this.$route.meta.description,
                  path:this.$route.path
                }
                this.routerList.push(obj)
              }
          },
          // 深度观察监听
          deep: true
      }
    }
};
</script>

<style scoped>
.router-history {
  box-sizing: border-box;
  background-color: white;
  position: absolute;
  top: 62px;
  left: 300px;
  right: 0;
  height: 41px;
  line-height: 41px;
}

.container{
   display: flex;
   list-style: none;
}

.router-item{
  padding-left: 10px;
  padding-right: 10px;
}

.actived{
  background-color:#f0f7ff;
  color: blue;
}

.el-icon-close{
  font-size: 16px;
  margin-left: 2px;
}

.el-icon-close:hover{
  box-sizing: border-box;
  border-radius: 50% ;
  background-color: gray;
  color: white;
}

.iconfont {
        font-family: "iconfont" !important;
        font-size: 6px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

</style>