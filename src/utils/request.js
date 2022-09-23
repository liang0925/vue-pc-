// 引入axios
import axios from 'axios'
// 安装引入qs
import qs from 'qs'

const env = process.env.NODE_ENV;
// 根据不同的环境，配置不同的baseURL,生产环境直接配置生成环境的地址
axios.defaults.baseURL = (env === 'development' ? '本地地址' : '线上地址')
// 设置超时时间
axios.defaults.timeout = 10000;

// 是否允许跨域携带凭证
axios.defaults.withCredentials = false

// 设置请求传递数据的格式 json
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 将post的请求体转化成x-www-form-urlencoded格式
axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截器
axios.interceptors.request.use(config => {
  // 获取到token
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
    }, error => {
    return Promise.reject(error)
    })
    // 响应拦截器
    axios.interceptors.response.use(response => {
    return response.data
    }, error => {
    let { response } = error
    if (response) {
        // 服务器返回结果
        switch (response.status) {
            // 当前请求需要用户验证（一般是未登录）
            case 401:
                break;
            // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
            case 403:
                break;
            // 找不到页面
            case 404:
                break;
        }
    } else {
        // 服务器没有返回结果
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
            return
        }
        return Promise.reject(error)
    }
})

export default {
    /**
     * @param {String} url
     * @param {Object} data
     * @returns Promise
     */
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'post',
                    url,
                    data: qs.stringify(data),
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                });
        })
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                    method: 'get',
                    url,
                    params: data,
                })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
};