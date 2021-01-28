import axios from '@axios'

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUserId(state) {
      if (state.user === null) {
        return sessionStorage.getItem('selectedUserId')
      }
      return state.user._id
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      sessionStorage.setItem('selectedUserId', user._id)
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

    async addCustomer(ctx, { id, queryBody }) {
      const result = await axios.post(`/users/${id}/customer`, queryBody)
      return result
    },
    async getCustomers(ctx, { id, queryBody }) {
      const result = await axios.get(`/users/${id}/customer`, queryBody)
      return result
    },

    async addDeviceToken(ctx, { id, queryBody }) {
      const result = await axios.post(`/users/${id}/token`, queryBody)
      return result
    },

    async deleteDeviceToken(ctx, { id, tokenId }) {
      const result = await axios.delete(`/users/${id}/token/${tokenId}`)
      return result
    },
  },
}
