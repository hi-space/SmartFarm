export default {
  UPDATE_USER_INFO(state, payload) {
    state.userData = payload
    state.userId = payload.id
  },

}
