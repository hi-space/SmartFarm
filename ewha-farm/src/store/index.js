import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
// eslint-disable-next-line import/no-cycle
import auth from './auth'
import users from './users'
import farm from './farms'
import housing from './housing'
import device from './devices'
import cctv from './cctv'
import button from './button'
import sensor from './sensor'
import push from './push'

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
    cctv,
    button,
    sensor,
    push,
  },
  strict: process.env.DEV,
})
