import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import auth from './auth'
// import userList from './user-list'
// import userView from './user-view'
// import farm from './farm'
// import device from './device'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,

    auth,
    // userList,
    // userView,
    // farm,
    // device,
  },
  strict: process.env.DEV,
})
