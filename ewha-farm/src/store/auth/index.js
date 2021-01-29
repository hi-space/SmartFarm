import state from './authState'
import mutations from './authMutations'
// eslint-disable-next-line import/no-cycle
import actions from './authActions'
import getters from './authGetters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
