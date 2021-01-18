import axios from '@axios'

export default {
  namespaced: true,
  state: {
    sensors: [],
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchSensors(ctx, queryParams) {
      const result = await axios.get('/sensor', { params: queryParams })
      return result
    },
    async fetchSensor(ctx, { id }) {
      const result = await axios.get(`/sensor/${id}`)
      return result
    },
    async createSensor(ctx, { queryBody }) {
      const result = await axios.post('/sensor', queryBody)
      return result
    },
    async updateSensor(ctx, { id, queryBody }) {
      const result = await axios.put(`/sensor/${id}`, queryBody)
      return result
    },
    async deleteSensor(ctx, { id }) {
      const result = await axios.delete(`/sensor/${id}`)
      return result
    },
  },
}
