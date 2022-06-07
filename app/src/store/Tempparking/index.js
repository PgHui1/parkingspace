/*临时车位页的数据 */
import {reqGetAllTemp,reqDeleteTemp,reqUpdateTemp,reqAddTemp,reqSelectByPlate} from '@/api/index'
const state = {
    tableData:[],
    unUsedList:[],
    total:0
}

const mutations = {
    GETALLTEMP(state,data){
        state.tableData = data.list
        state.total = data.total
    },
    GETONETEMP(state,data){
        state.tableData = data.list
        state.total = data.total
    }
}

const actions= {
    async getAllTemp({commit},pageNo){
        let result = await reqGetAllTemp(pageNo);
        commit("GETALLTEMP",{
            total:result.total,
            list:result.list
        })
    },
    async getOneTemp({commit},plate){
        let result = await reqSelectByPlate(plate);
        if(result.list[0] == null){
            throw "该车牌不存在或已经离开";
        }else{
            commit("GETONETEMP",{
                total:result.total,
                list:result.list
            })
        }
        
    },
    async addTemp({commit},temp){
        let type = temp.end_type=="使用中"?0:1;
        return await reqAddTemp({
            parking_time:temp.parking_time,
            name:temp.name,
            car_plate:temp.car_plate,
            end_type:type,
            phone:temp.phone,
            place:temp.place,
            end_time:temp.end_time
        });
    },
    async updateTemp({commit},temp){
        let type = temp.end_type=="使用中"?0:1;
        return await reqUpdateTemp({
            parking_time:temp.parking_time,
            name:temp.name,
            car_plate:temp.car_plate,
            end_type:type,
            phone:temp.phone,
            place:temp.place
        });
    },
    async deleteTemp({commit},name){
        return await reqDeleteTemp(name); 
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


