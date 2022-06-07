<template>
  <section>
    <div class="box">
      <div class="form">
        <h2 v-if="$route.path == '/login'">Login</h2>
        <h2 v-else-if="$route.path == '/register'">Register</h2>
        <form>
          <span style="color: red" :class="{ actived: !isUsed }"
            >用户名已存在</span
          >
          <div class="inputBox">
            <input
              v-if="$route.path == '/login'"
              type="text"
              placeholder="username"
              v-model="username"
            />
            <input
              v-if="$route.path == '/register'"
              type="text"
              placeholder="username"
              v-model="username"
              @blur="testUsername"
            />
            <i class="el-icon-user-solid"></i>
          </div>
          <div class="inputBox">
            <input type="password" placeholder="password" v-model="password" />
            <i class="el-icon-lock"></i>
          </div>
          <label v-if="$route.path == '/login'" class="remember">
            <input
              @click="rememberme = !rememberme"
              type="checkbox"
              :checked="rememberme === 1"
            />
            remember me
          </label>
          <div class="inputBox">
            <el-button
              v-if="$route.path == '/login'"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
            <el-button
              v-else-if="$route.path == '/register'"
              class="login-btn"
              @click="register"
              :disabled="isUsed"
            >
              注册
            </el-button>
          </div>
          <div v-if="$route.path == '/login'">
            <p>没有账号?<router-link to="/register"> 注册一个</router-link></p>
          </div>
          <div v-if="$route.path == '/register'">
            <p>注册完成?<router-link to="/login"> 去登录</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { openDB, closeDB } from "./indexDB";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isUsed: false,
      rememberme: 0,
    };
  },
  methods: {
    login() {
      let _this = this;
      openDB().
      then((db) => {
        if(db){
            var request = db
            .transaction(["userInfo"], "readwrite")
            .objectStore("userInfo")
            .get(_this.username);
            request.onsuccess = function () {
              if (!request.result || request.result.password !== _this.password) {
                _this.$message({
                  message: "登录失败",
                  type: "error",
                });
              } else {
                if (_this.rememberme) {
                  localStorage.setItem("user", {});
                } else {
                  if (localStorage.getItem("user")) {
                    localStorage.removeItem("user");
                  }
                }
                _this.$message({
                  message: "登录成功",
                  type: "success",
                });
                sessionStorage.setItem("loginStatus", 1);

                 _this.$router.push({name:"welcome"});
                  
              }
              closeDB(db);
            };
        }else{
          _this.$message({
            message: "获取数据失败,请稍后再试",
            type: "error",
          });
        }
      })
      .catch((error)=>{
         _this.$message({
            message: error,
            type: "error",
          });
      })
    }, 
    register() {
      let _this = this;
      if (_this.username === "" || _this.password ==="") {
        alert("用户名或密码不能为空");
        _this.isUsed = false;
      } else {
        openDB()
        .then((db) => {
            if(db){
              var request = db
                          .transaction(["userInfo"], "readwrite")
                          .objectStore("userInfo")
                          .add({ username: this.username, password: this.password });

            request.onsuccess = function () {
              _this.$message({
                message: "注册成功",
                type: "success",
              });
            };
            request.onerror = function (){
              _this.$message({
                message: "获取数据失败,请稍后再试",
                type: "success",
              });
            }
            closeDB(db);
          }else{
             _this.$message({
                message: "获取数据失败,请稍后再试",
                type: "success",
              });
          }
      })
      .catch((error)=>{
         _this.$message({
            message: error,
            type: "error",
          });
      })
      }
    },
    testUsername() {
      let _this = this;
       openDB()
        .then((db) => {
            if(db){
                var request = db
                        .transaction(["userInfo"], "readwrite")
                        .objectStore("userInfo")
                        .get(this.username);
                request.onsuccess = function () {
                  if (!request.result) {
                    _this.isUsed = false;
                  } else {
                    _this.isUsed = true;
                }
              }
              closeDB(db);
            }else{
               _this.$message({
                message: "获取数据失败,请稍后再试",
                type: "success",
              });
            }
        })
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

section {
  display: flex;
  /* 左右居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  min-height: 100vh;
  /* css的linear函数，用来做线性变化 */

  /* 渐变轴为45度(默认从上到下)，从蓝色渐变到红色 */
  /*  background: linear-gradient(45deg, blue, red);; */
  /* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 
linear-gradient(0deg, blue, green 40%, red);*/
  background: linear-gradient(
    -30deg,
    #03a9f4 0%,
    #3a78b7 50%,
    #262626 50%,
    #607d8b 100%
  );
  /* 给图像应用色相旋转。让图像中的颜色，在色相环中做对应的旋转。值为0deg，则图像无变化 */
  /*     /* filter: hue-rotate(120deg); */
  animation: animate 5s linear infinite;
}

.box {
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 50px;
  width: 360px;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 5px 35px rgba(0, 0, 0, 0.2);
}

@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.box::after {
  content: "";
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  border-radius: 5px;
  pointer-events: none;

  /*to bottom可省略 第一个从0开始，第二个从15开始，第三个从50开始,中间两个透明 */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 15%,
    transparent 50%,
    transparent 85%,
    rgba(255, 255, 255, 0.3) 100%
  );
}

.box .form h2 {
  color: white;
  font-weight: 600px;
  /* 字间间隔 */
  letter-spacing: 2px;
  margin-bottom: 30px;
}

.box .form .inputBox {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

/* box下面的所有form */
.box .form .inputBox input {
  width: 100%;
  /* 删掉点击时出现的边框线 */
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  /* 左右8 上下10 */
  padding: 8px 10px;
  /* 让输入的起始位置youyi */
  padding-left: 35px;
  color: white;
  font-size: 16px;
  font-weight: 300;
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.2);
}

.box .form .inputBox input::placeholder {
  color: white;
}

.box .form .inputBox input[type="submit"] {
  background-color: white;
  color: black;
  max-width: 100px;
  padding: 8px 10px;
  box-shadow: none;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
}

.box .form .inputBox i {
  position: absolute;
  top: 8px;
  left: 10px;
  transform: scale(0.7);
  filter: invert(1);
}

.remember {
  position: relative;
  display: inline-block;
  color: white;
  font-weight: 300;
  cursor: pointer;
  margin-bottom: 10px;
}

.login-btn {
  width: 80px;
  height: 40px;
}

.actived {
  display: none;
}
</style>