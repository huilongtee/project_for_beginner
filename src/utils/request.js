import router from '@/router';
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 30000// system will timeout in 30s, and will throw error if backend didn't respond within 30s
})

// request interceptor
// able to request automatically to do some processes
// like add token for all, encrypt all requests's parameter
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // let user =localStorage.getItem('honey-user')?JSON.parse(localStorage.getItem('user')):null
   let user= JSON.parse(localStorage.getItem('honey-user') ||'{}')
    
    // config.headers['token']='token'
    // now every page will add token, and every request will not get the response of 401

    config.headers['token']=user.token

    return config
}, error => {
    console.log("request error:" + error)
    return Promise.reject(error)
});

// response interceptors
// able to response all result automatically in all ports
request.interceptors.response.use(
    response => {
        let res = response.data;
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        //if get code 401, means that you do not have token
        // website will redirect you back to login page

        if(res.code==='401'){
            router.push('/login')
        }
        return res
    },
    error => {
        console.log("request error:" + error)
        return Promise.reject(error)
    }
)

export default request