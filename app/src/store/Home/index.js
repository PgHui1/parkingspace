/* Home页的数据 */
import {reqGetWeather,reqGetAddress} from '@/api/index'
const state = {
    weather:{},
    address:{},
    menuList: [
        {
          menuName: "车位占用情况",
          index: "/home/occupancy",
          icon:"el-icon-house"
        },
        {
          menuName: "业主信息管理",
          index: "/home/people",
          icon:"el-icon-user-solid"
        },
        {
          menuName: "临时车位指定",
          index: "/home/tempparking",
          icon:"el-icon-time"
        },
        {
          menuName: "车流量查询",
          index: "/home/carflow",
          icon:"el-icon-search"
        },
        {
          menuName: "异常信息",
          index: "/home/exception",
          icon:"el-icon-warning"
        },
        {
          menuName: "车辆出入记录",
          index: "/home/record",
          icon:"el-icon-document"
        },
        {
            menuName:"禁入车辆管理",
            index:"/home/manage",
            icon:"iconfont icon-jinzhi",
        }
    ],
    entryList:[
        {
            title:"车位占用情况",
            bg:{
                backgroundColor: "#e8d9fa"
            },
            icon:"iconfont icon-tingchewei",
            route:"/home/occupancy"
        },
        {
            title:"业主信息管理",
            bg:{
                backgroundColor: "#d1ecff"
            },
            icon:"iconfont icon-yonghutianchong",
            route:"/home/people"
        },
        {
            title:"临时车位指定",
            bg:{
                backgroundColor: "none"
            },
            icon:"iconfont icon-linshi",
            route:"/home/tempparking"
        },
        {
            title:"车流量查询",
            bg:{
                backgroundColor: "#fff3d2"
            },
            icon:"iconfont icon-liuliang",
            route:"/home/carflow"
        },
        {
            title:"异常信息",
            bg:{
                backgroundColor: "#cdf4f1"
            },
            icon:"iconfont icon-yichang",
            route:"/home/exception"
        },
        {
            title:"车辆出入记录",
            bg:{
                backgroundColor: "#fee1d3"
            },
            icon:"iconfont icon-jilu",
            route:"/home/record"
        },
        {
            title:"禁入车辆管理",
            bg:{
                backgroundColor: "#f8485d"
            },
            icon:"iconfont icon-jinzhi",
            route:"/home/manage"
        }
    ]
}

const mutations = {
    GETWEATHER(state,data){
    
        state.weather = data;
    },
    GETADDRESS(state,data){
        state.address = data;
    }
}

const actions= {
    async getWeather({commit},city){
        try {
            
            let result = await reqGetWeather(city);
            commit('GETWEATHER',result.data)
        }catch(e){
            throw("获取天气信息失败,请检查网络是否正常")
        }
    },
    async getAddress({commit}) {
        try {
            let result = await reqGetAddress()
            commit('GETADDRESS',result.data)
            if(result.adcode.length==0){
                throw("获取位置信息失败")
            }
            return result;
        }catch(e){
            throw("获取位置信息失败")
        }
    }
}

const getters = {
    weather(state){
        return state.weather || {};
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}


