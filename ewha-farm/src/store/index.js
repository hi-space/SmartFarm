import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
import users from './users'
import farm from './farms'
import housing from './housing'
import device from './devices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,

    auth,
    users,
    farm,
    housing,
    device,
  },
  strict: process.env.DEV,
})
