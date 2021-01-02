import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import VeeValidate, { Validator } from 'vee-validate';
import { VueHammer } from 'vue2-hammer'
import router from './router'
import store from './store/store'
import axios from './axios.js'

import 'material-icons/iconfont/material-icons.css'
import 'vuesax/dist/vuesax.css'
import './utils/filters.js'
import '../themeConfig.js'
import './globalComponents.js'
import './assets/scss/main.scss'
import '@/assets/css/main.css'

require('./assets/css/iconfont.css')

Vue.use(Vuesax)
Vue.use(VeeValidate)
Vue.use(VueHammer)

Vue.prototype.$http = axios
Vue.config.productionTip = false

import ko from 'vee-validate/dist/locale/ko.js'
Validator.localize('ko', ko)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')