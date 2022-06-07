/* Home页的数据 */
import {reqGetioMSelList,reqUpdateioMSelList,reqInsertioMSelList,reqDeleteioMSelList} from '@/api/index'
const state = {
    tableData:[],
    total:0
}

const mutations = {
   GETIOMSELLIST(state,data){
        state.tableData = data.tableData;
        state.total = data.total;
   }
}

const actions= {
    async getioMSelList({commit},pageNo){
        let result = await reqGetioMSelList(pageNo);
        commit("GETIOMSELLIST",{
            tableData:result.list,
            total:result.total
        })
    },
    async updateioMSelList({commit},{id,car_plate}){
        return await reqUpdateioMSelList({id,car_plate});

    },
    async insertioMSelList({commit},{zone,level,car_plate}){
        return await reqInsertioMSelList({zone,level,car_plate});
    },
    async deleteioMSelList({commit},id){
        return await reqDeleteioMSelList(id);  
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


