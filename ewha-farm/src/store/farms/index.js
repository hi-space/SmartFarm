import axios from '@axios'

export default {
  namespaced: true,
  state: {
    farms: [],
  },
  getters: {
    getFarmSelect(state) {
      console.log(state.farms)
      const farmList = state.farms
      return farmList.map((obj => {
        const rObj = {}
        rObj.label = obj.name
        rObj.value = obj._id
        return rObj
      }))
    },
  },
  mutations: {
    SET_FARM(state, farms) {
      state.farms = farms
    },
    CLEAR_FARM(state) {
      state.farm = null
    },
  },
  actions: {
    async fetchFarms({ commit }, queryParams) {
      const result = await axios.get('/farm', { params: queryParams })
      commit('SET_FARM', result.data)
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
