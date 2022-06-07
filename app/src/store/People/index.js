/* Home页的数据 */
import {reqPeopleInfo,reqUpdatePeople,reqDeletePeople,reqAddPeople} from '@/api/index'
const state = {
   tableData:[],
   total:0,
   
       
}

const mutations = {
    PEOPLEINFO(state,data){
        state.total = data.total;
        state.tableData = data.list;
    }
}

const actions= {
    async peopleInfo({commit}){
        let result = await reqPeopleInfo();
        let {list,total} = result;
        commit("PEOPLEINFO",{list,total})
    },
    async updatePeople({commit},people){

        return await reqUpdatePeople(people);
        
    },
    async deletePeople({commit},name){
        return await reqDeletePeople(name);
    },
    async addPeople({commit},people){
        return await reqAddPeople(people);
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


