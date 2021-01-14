export default {
  UPDATE_USER_INFO(state, payload) {
    state.userId = payload.id
    state.userRole = payload.userRole
  },

}
