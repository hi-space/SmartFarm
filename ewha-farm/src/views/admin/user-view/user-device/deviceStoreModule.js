import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchDevices(ctx, queryParams) {
      const result = await axios.get('/device', { params: queryParams })
      return result
    },
    async fetchDevice(ctx, { id }) {
      const result = await axios.get(`/device/${id}`)
      return result
    },
    async createDevice(ctx, { queryBody }) {
      const result = await axios.post('/device', queryBody)
      return result
    },
    async updateDevice(ctx, { id, queryBody }) {
      const result = await axios.put(`/device/${id}`, queryBody)
      return result
    },
    async deleteDevice(ctx, { id }) {
      const result = await axios.delete(`/device/${id}`)
      return result
    },
  },
}
