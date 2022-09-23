import axios from '../utils/request'
let { get } = axios

export const detail = data => get("请求地址", data)