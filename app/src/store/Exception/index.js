/* 异常页的数据 */
import {reqGetException,reqDeleteException,reqUpdateException} from '@/api/index'
const state = {
    tableData:[],
    total:0
}

const mutations = {
    GETEXCEPTION(state,data){
        state.tableData = data.tableData;
        state.total = data.total;
    }
}

const actions= {
    async getException({commit},pageNo){
     
        let result = await reqGetException(pageNo);
        commit("GETEXCEPTION",{
            total:result.total,
            tableData:result.list
        })
    },
    async deleteException({commit},plate){
        return await reqDeleteException(plate);
    },
    async updateException({commit},plate){
        return await reqUpdateException(plate);
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


