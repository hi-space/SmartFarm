import axios from '@axios'

export default {
  namespaced: true,
  state: {
    device: null,
  },
  getters: {},
  mutations: {
    SET_DEVICE(state, device) {
      state.device = device
    },
    CLEAR_DEVICE(state) {
      state.device = null
    },
  },
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

    async setRelay(ctx, { id, queryBody }) {
      console.log(id)
      const result = await axios.post(`/device/${id}/relay`, queryBody)
      return result
    },
    async fetchRelay(ctx, { id }) {
      const result = await axios.get(`/device/${id}/relay`)
      return result
    },
  },
}
