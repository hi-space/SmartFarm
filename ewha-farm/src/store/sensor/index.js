import axios from '@axios'

export default {
  namespaced: true,
  state: {
    sensors: [],
  },
  getters: {
    getSensorSelect(state) {
      const sensorList = state.sensors
      return sensorList.map((obj => {
        const rObj = {}
        rObj.label = obj.name
        rObj.value = obj._id
        return rObj
      }))
    },
    getSensorIds(state) {
      return state.sensors.map(el => el._id)
    },
  },
  mutations: {
    SET_SENSOR(state, sensors) {
      state.sensors = sensors
    },
    CLEAR_SENSOR(state) {
      state.sensors = null
    },
  },
  actions: {
    async fetchSensors(ctx, queryParams) {
      const result = await axios.get('/sensor', { params: queryParams })
      ctx.commit('SET_SENSOR', result.data)
      result.data.forEach(async element => {
        await ctx.dispatch('fetchSensor', { id: element._id })
      })
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
