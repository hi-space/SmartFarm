import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchUsers(ctx, queryParams) {
      const result = await axios.get('/users', { params: queryParams })
      return result
    },
    async fetchUser(ctx, { id }) {
      const result = await axios.get(`/users/${id}`)
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
