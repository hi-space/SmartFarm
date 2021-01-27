import Vue from 'vue'

// axios
import axios from 'axios'
import JwtService from '@core/auth/jwt/jwtService'

const axiosIns = axios.create({
  baseURL: 'http://220.71.87.34:5000/api/',
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    Authorization: `Bearer ${JwtService.getToken}`,
  },
})

Vue.prototype.$http = axiosIns

export default axiosIns
