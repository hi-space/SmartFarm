import axios from '@axios'

export default {
  namespaced: true,
  state: {
    push: [],
  },
  getters: {},
  mutations: {
    SET_PUSH(state, push) {
      state.push = push
    },
  },
  actions: {
    async fetchPush({ commit }, { id }) {
      const result = await axios.get(`/push/${id}`)
      commit('SET_PUSH', result.data)
      return result
    },
    async deletePush(ctx, { id, pushId }) {
      const result = await axios.delete(`/push/${id}/${pushId}`)
      return result
    },
  },
}
