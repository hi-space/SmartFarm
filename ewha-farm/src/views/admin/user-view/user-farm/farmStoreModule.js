import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchFarms(ctx, queryParams) {
      const result = await axios.get('/farm', { params: queryParams })
      return result
    },
    async fetchFarm(ctx, { id }) {
      const result = await axios.get(`/farm/${id}`)
      return result
    },
    async createFarm(ctx, { queryBody }) {
      const result = await axios.post('/farm', queryBody)
      return result
    },
    async updateFarm(ctx, { id, queryBody }) {
      const result = await axios.put(`/farm/${id}`, queryBody)
      return result
    },
    async deleteFarm(ctx, { id }) {
      const result = await axios.delete(`/farm/${id}`)
      return result
    },
  },
}
