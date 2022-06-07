<template>
  <el-container class="container">
    <!-- 侧边栏开始 -->
    <el-aside width="300px">
      <h2>车位管理系统</h2>
      <el-menu
        background-color="#191a23"
        active-text-color="#4d70ff"
        :router="true"
        :default-active="$route.path"
        width="300px"
      >
        <el-submenu class="submenu" index="1">
          <template class="" slot="title"
            ><i class="el-icon-menu"></i><span>功能菜单</span></template
          >
          <el-menu-item-group style="">
            <el-menu-item
              v-for="(menu, index) in menuList"
              :key="index"
              :index="menu.index"
            >
              <i :class="menu.icon"></i>
              {{ menu.menuName }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 侧边栏结束 -->
    <el-container>
      <!-- 头部开始 -->
      <el-header style="text-align: right; font-size: 12px">
        <div class="city" style="float: left">
          <span>
            当前定位城市:<span style="font-size: 16px">{{ weather.city }}</span
            >,定位失败或不准确? 手动选择
          </span>
          <el-cascader size="mini" :options="options" @change="handleChange" />
        </div>
        <el-button type="danger" @click="logOut">退出登录</el-button>
      </el-header>
      <!-- 头部结束 -->
      <!--  记录路由信息-->
      <RouterHistory></RouterHistory>
      <!-- 欢迎页 -->
      <Welcome :weather="weather" :info="weather.forecast"></Welcome>
        <router-view class="route" :allPlace="allPlace"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import RouterHistory from "@/components/RouterHistory.vue";
import { mapState, mapGetters } from "vuex";
import { reqGetAll } from "@/api/index";
import { provinceAndCityData, CodeToText } from "element-china-area-data"; // 4.省市不带‘全部’二级联动选择
import Welcome from "@/components/Welcome"

export default {
  name: "home",
  data() {
    return {
      time: null,
      options: provinceAndCityData,
      CodeToText,
      number:undefined,
      allPlace:undefined
    };
  },
  mounted() {
    /* 获取位置和天气信息 */
    this.$store
      .dispatch("getAddress")
      .then((success) => {
        this.$store.dispatch("getWeather", success.city);
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "error",
        });
        this.$store.dispatch("getWeather", "北京")
        .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
        });
      });
    reqGetAll()
    .then((allPlace)=>{
      this.allPlace = allPlace;
    })
  },
  methods: {
    logOut(){
      sessionStorage.removeItem("loginStatus");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
    /* 改变城市更新天气 */
    handleChange(a) {
      let cityname;
      if (a[0] === "110000") {
        cityname = "北京";
      } else if (a[0] === "120000") {
        cityname = "天津";
      } else if (a[0] === "500000") {
        cityname = "重庆";
      } else if (a[0] === "310000") {
        cityname = "上海";
      } else {
        let citycode = a[1];
        cityname = CodeToText[citycode];
      }
      this.$store.dispatch("getWeather", cityname)
      .catch((error) => {
          this.$message({
            message: error,
            type: "error",
          });
        });
    }
  },
  computed: {
    ...mapState({
      menuList: (store) => {
        return store.home.menuList;
      },
      entryList: (store) => {
        return store.home.entryList;
      },
    }),
    ...mapGetters(["weather"]),
  },
  components: {
    RouterHistory,
    Welcome
  },
};
</script>

<style  scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f1f2f6;
}

.el-header {
  background-color: white;
  color: #333;
  line-height: 60px;
  position: absolute;
  top: 0;
  bottom: 100px;
  left: 300px;
  right: 0;
}

.el-aside {
  color: white;
  background-color: #191a23;
  position: absolute;
  left: 0;
  right: 300px;
  top: 0;
  bottom: 0;
}

.el-aside * {
  color: white;
}

.el-row {
  display: flex;
  justify-content: space-between;
}

.el-col {
  text-align: center;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 18px;
  margin-left: 2px;
  margin-right: 8px;
}


.route {
  position: absolute;
  top: 380px;
  left: 320px;
  bottom: 20px;
  right: 20px;
}

.el-submenu__title:hover {
  background-color: #000 !important;
}

.el-submenu:hover {
  background-color: #191a23 !important;
}
.el-menu-item {
  background-color: #191a23 !important;
}

.submenu {
  width: 300px;
}

.el-menu-item:hover {
  background-color: #191a23 !important;
}

.el-aside > h2 {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
</style>