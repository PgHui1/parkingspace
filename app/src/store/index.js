import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
import home from '@/store/Home/index'
import people from  '@/store/People/index'
import occupancy from  '@/store/Occupancy/index'
import tempparking from  '@/store/Tempparking/index'
import exception from  '@/store/Exception/index'
import record from  '@/store/Record/index'
import carflow from  '@/store/Carflow/index'
import iomanage from  '@/store/IOManage/index'


export default new Vuex.Store({
    modules:{
        home,
        people,
        occupancy,
        tempparking,
        exception,
        record,
        carflow,
        iomanage
    }
})