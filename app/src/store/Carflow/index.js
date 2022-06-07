/*车流量页面的数据 */
import { reqGetFlow } from '@/api/index'
const state = {
    /* 出流量x轴数据,入流量x轴数据 */
    outData: [[], []],
    /* 出流量y轴数据,入流量y轴数据 */
    inData: [[], []]
}

const mutations = {
    GETFLOW(state, { outFlow, inFlow }) {
        let oIndex = 0;
        let iIndex = 0;
        outFlow.forEach(element => {
            state.outData[0][oIndex] = element.time
            state.outData[1][oIndex] = element.count
            oIndex++;
        });
        inFlow.forEach(element => {
            state.inData[0][iIndex] = element.time
            state.inData[1][iIndex] = element.count
            iIndex++;
        });
    }
}

const actions = {
    async getFlow({ commit }, { start, end }) {
        /* 0入1出 */
        let outFlow = await reqGetFlow({ start, end, type:1});
        let inFlow = await reqGetFlow({ start, end, type: 0 });
        commit("GETFLOW", {
            outFlow,
            inFlow
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


