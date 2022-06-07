/* 临时页的数据 */
import {reqGetAllParking,reqGetOneParking,reqGetUnusedParking,pkSelUnOcc} from '@/api/index'
import { Result } from 'element-ui';
const state = {
   tableData:[],
   total:0,
   allPlace:[]
}

const mutations = {
    ALLPARKING(state,data){
        state.tableData = data.tableData;
        state.total = data.total;
    },
    ONEPARKING(state,data){
        state.tableData = data.tableData;
        state.total = data.total;
    },
    UNUSED(state,data){
        state.tableData = data;
        state.total = data.length;
    },
    ALLPLACE(state,data){
        for(let i =0;i<data.length;i ++){
            state.allPlace[i] = {value:data[i]};
        }
    }
}

const actions= {
    async allParking({commit},pageNo){
        let result = await reqGetAllParking(pageNo);
        commit("ALLPARKING",{
            tableData:result.list,
            total:result.total
        })
    },
    async oneParking({commit},place){
         let result = await reqGetOneParking(place); 
         commit("ONEPARKING",{
            tableData:result.list,
            total:result.total
        }) 
    },
    async unUsed({commit}){
         let result = await pkSelUnOcc();
         commit("UNUSED",result)
    }

    

}

const getters = {
   
}

export default {
    state,
    mutations,
    actions,
    getters
}


