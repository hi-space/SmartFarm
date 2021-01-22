import axios from '@axios'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser(state) {
      return state.user
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    },
  },
  actions: {
    async fetchUsers(ctx, queryParams) {
      const result = await axios.get('/users', { params: queryParams })
      return result
    },
    async fetchUser({ commit }, { id }) {
      const result = await axios.get(`/users/${id}`)
      commit('SET_USER', result.data)
      return result
    },
    async updateUser(ctx, { id, queryBody }) {
      const result = await axios.put(`/users/${id}`, queryBody)
      return result
    },
    async deleteUser(ctx, { id }) {
      const result = await axios.delete(`/users/${id}`)
      return result
    },
  },
}
