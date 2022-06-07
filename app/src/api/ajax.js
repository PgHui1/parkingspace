import axios from 'axios'

/* 高德开放平台使用 */
const amapRequests = axios.create({
    timeout:5000
})



/* 业务请求 */
const serviceRequests = axios.create({
    timeout:5000,
     baseURL:"http://121.5.134.214:8081/"
    /* baseURL:"/api", */
})


amapRequests.interceptors.request.use((config)=>{
    return config;
})

amapRequests.interceptors.response.use(result=>{
    return result.data;
},() => {
    return Promise.reject(new Error("fail"))
})


serviceRequests.interceptors.request.use((config)=>{
    
    if(config.method ==='get'){
        config.data = {unused:0};
    }
    return config;
})

serviceRequests.interceptors.response.use(result=>{
    return result.data;
},() => {
    return Promise.reject(new Error("fail"))
})

export  {amapRequests,serviceRequests};
