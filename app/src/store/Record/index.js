/* 记录页的数据 */
import {reqGetRecord,reqGetRecordByDate} from '@/api/index'
const state = {
   tableData:[],
   total:0
       
}

const mutations = {
    GETRECORD(state,data){
        state.tableData = data.list;
        state.total = data.total
    }
}

const actions= {
    async getRecord({commit},pageNo){
        let result = await reqGetRecord(pageNo);
        commit("GETRECORD",{
            total:result.total,
            list:result.list
        })
    },
    async getRecordByDate({commit},{start,end,pageNo}){
        let result = await reqGetRecordByDate({start,end,pageNo});
        commit("GETRECORD",{
            total:result.total,
            list:result.list
        })
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


