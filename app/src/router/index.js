import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
/* 组件 */
import Login from "@/pages/Login/index.vue";
import Home from "@/pages/Home";
import Carflow from "@/pages/Home/Carflow";
import Exception from "@/pages/Home/Exception";
import Occupancy from "@/pages/Home/Occupancy";
import Tempparking from "@/pages/Home/Tempparking";
import Record from "@/pages/Home/Record";
import People from "@/pages/Home/People";
import Quick from "@/pages/Home/Quick/QuickEntry.vue";
import IOManage from "@/pages/Home/IOManage";

/*重写push方法,解决相同路径跳转报错 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location,resolve,reject){
    if(resolve&&reject){
        originalPush.call(this,location,resolve,reject)
    }else {
        originalPush.call(this,location,()=>{},()=>{});
    }
}

const vueRouter = new VueRouter({
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                needAtuh:true,
                description:'首页'
            },
            children:[
                {
                    name:"manage",
                    path:"manage",
                    component:IOManage,
                    meta:{
                        needAtuh:true,
                        description:'管理'
                    }
                },
                {
                    name:"welcome",
                    path:"welcome",
                    component:Quick,
                    meta:{
                        needAtuh:true,
                        description:'快捷入口'
                    }
                },
                {
                    path:"carflow",
                    component:Carflow,
                    meta:{
                        needAtuh:true,
                        description:'车流量查询'
                    }
                },
                {
                    path:"exception",
                    component:Exception,
                    meta:{
                        needAtuh:true,
                        description:'异常信息'
                    }
                },
                {
                    path:"occupancy",
                    component:Occupancy,
                    meta:{
                        needAtuh:true,
                        description:'车位占用情况'
                    }
                },
                {
                    path:"tempparking",
                    component:Tempparking,
                    meta:{
                        needAtuh:true,
                        description:'临时车位指定'
                    }
                },
                {
                    path:"record",
                    component:Record,
                    meta:{
                        needAtuh:true,
                        description:'车辆出入记录'
                    }
                },
                {
                    path:"people",
                    component:People,
                    meta:{
                        needAtuh:true,
                        description:'业主信息管理'
                    }
                }
            ]
        },
        {
            name:"login",
            path: "/login",
            component: Login
            
        },
        {
            name:"register",
            path: "/register",
            component: Login,
            
        },
        {
            path:"/",
            redirect:"/home/welcome"
        }
    ]
})

vueRouter.beforeEach((to, from, next) => {
    var item = sessionStorage.getItem("loginStatus");

    // item 说明该用户已登陆
    if (item==="1" && to.path !== '/login') {
        next();
    }else if(item==="1" && to.path === '/login'){
        next({ name:'welcome'});
    }else {
        let loginRequest = to.meta.needAtuh;
        if (loginRequest){
            let user = localStorage.getItem("user");
         
            if (user){
                sessionStorage.setItem("loginStatus",1)
                next()
            }else {
                next({name:"login"});
            }
        }else {
            next()
        }
    }
})

export default vueRouter