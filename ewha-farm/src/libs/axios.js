import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://220.71.87.34:5000/api/',
  timeout: 1000,
  headers: { 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS' },
})

Vue.prototype.$http = axiosIns

export default axiosIns
