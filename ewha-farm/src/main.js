import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './filters/filters.js'
import './globalComponents.js'

import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

import axios from './axios.js'
Vue.prototype.$http = axios

import './assets/scss/main.scss'
import '@/assets/css/main.css'

import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// API Calls
// import './http/requests'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // vuetify,
  render: h => h(App)
}).$mount('#app')
