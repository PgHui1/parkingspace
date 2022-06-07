import { amapRequests, serviceRequests } from '@/api/ajax'
const key = "8f6151b72bda28b89465e2c19bd41f61"
/* 天气接口 */
export const reqGetWeather = (city) => {
    return amapRequests({
        method: 'get',
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        params: {
            city
        }
    })
}
/* 高德位置API */
export const reqGetAddress = () => {
    return amapRequests({
        method: 'get',
        url: 'https://restapi.amap.com/v3/ip',
        params: {
            key
        }
    })
}


/* 剩余位置数量查询 */
export const reqGetCount = () => {
    return serviceRequests({
        method: 'get',
        url: '/pk/pkUnusedSelByCount',
    })
}

/* 车位全查询,*/
export const reqGetAll = () => {
    return serviceRequests({
        method: 'get',
        url: 'pk/pkSelCarPlaceNum',
    })
}


export const reqPeopleInfo = () => {
    return serviceRequests({
        method: 'get',
        url: '/pk/ownerList',
    })
}
/* 更新业主信息 */
export const reqUpdatePeople = (people) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ownerUpd',
        params: {
            name: people.name,
            phone: people.phone,
            car_plate: people.car_plate,
            parking_space: people.parking_space,
        }
    })
}
//删除业主信息
export const reqDeletePeople = (name) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ownerDel',
        params: {
            name
        }
    })
}

//添加业主
export const reqAddPeople = (people) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ownerIns',
        params: {
            name: people.name,
            phone: people.phone,
            car_plate: people.car_plate,
            parking_space: people.parking_space,
        }
    })
}

//车位全查询
export const reqGetAllParking = (pageNo) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/pkSelList',
        params: {
            pageNo,
            pageSize: 8
        }
    })
}

//车位余量查询
export const reqGetUnusedParking = (people) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/pkUnusedSelByCount'
    })
}

//车位指定
export const reqGetOneParking = (place) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/pkSelByPlace',
        params: {
            place
        }
    })
}
//车位指定
export const pkSelUnOcc = () => {
    return serviceRequests({
        method: 'get',
        url: '/pk/pkSelUnOcc'
    })
}

//临时车位全查询
export const reqGetAllTemp = (pageNo) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/tempSelList',
        params: {
            pageNo,
            pageSize: 8
        }
    })
}

//临时车位添加
export const reqAddTemp = ({ parking_time,name,car_plate,end_type,phone,place,end_time,}) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/tempIns',
        params: { parking_time,
            name,
            car_plate,
            end_type,
            phone,
            place,
            end_time,
        }
    })
}

//临时车位删除
export const reqDeleteTemp = (name) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/tempDel',
        params: {
            name
        }
    })
}

//临时车位修改
export const reqUpdateTemp = ({ parking_time, name, car_plate, end_type, phone, place }) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/tempUpd',
        params: {
            parking_time,
            name,
            car_plate,
            end_type: end_type,
            phone,
            place,
        }
    })
}

//临时车位按车牌查询
export const reqSelectByPlate = (plate) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/tempSelByPlate',
        params: {
            plate
        }
    })
}

//车流量查询
export const reqGetFlow = ({ start, end ,type}) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/ioSelByCount',
        params: {
            start,
            end,
            type
        }
    })
}


//异常表查询
export const reqGetException = (pageNo) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/errSel',
        params: {
            pageNo,
            pageSize: 8
        }
    })
}

//异常表删除
export const reqDeleteException = (plate) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/errDel',
        params: {
            plate
        }
    })
}

//异常表处理
export const reqUpdateException = (plate) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/errUpd',
        params: {
            plate
        }
    })
}


//记录表处理
export const reqGetRecord = (pageNo) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/ioSelList',
        params: {
            pageNo,
            pageSize: 8
        }
    })
}

//记录表按时间查询
export const reqGetRecordByDate = ({ start, end,pageNo }) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/ioSelByTime',
        params: {
            start,
            end,
            pageNo,
            pageSize:8
        }
    })
}

//禁入表查询
export const reqGetioMSelList = (pageNo) => {
    return serviceRequests({
        method: 'get',
        url: '/pk/ioMSelList',
        params: {
            pageNo,
            pageSize: 8
        }
    })
}

//禁入表更新
export const reqUpdateioMSelList = ({id,car_plate}) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ioMUpd',
        params: {
            id,
            car_plate
        }
    })
}

//禁入表插入
export const reqInsertioMSelList = ({zone,level,car_plate}) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ioMIns',
        params: {
            zone,
            level,
            car_plate
        }
    })
}

//禁入表删除
export const reqDeleteioMSelList = (id) => {
    return serviceRequests({
        method: 'post',
        url: '/pk/ioMDel',
        params: {
            id
        }
    })
}


