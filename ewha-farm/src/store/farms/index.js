import axios from '@axios'

export default {
  namespaced: true,
  state: {
    farms: [],
    farm: null,
  },
  getters: {
    getFarmId(state) {
      if (state.farm === null) {
        return sessionStorage.getItem('selectedFarmId')
      }
      return state.farm._id
    },
    getFarmSelect(state) {
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
    SET_FARMS(state, farms) {
      state.farms = farms
    },
    SET_FARM(state, farm) {
      state.farm = farm
      sessionStorage.setItem('selectedFarmId', farm._id)
    },
    CLEAR_FARM(state) {
      state.farm = null
    },
  },
  actions: {
    async fetchFarms({ commit }, queryParams) {
      const result = await axios.get('/farm', { params: queryParams })
      commit('SET_FARMS', result.data)
      return result
    },
    async fetchFarm({ commit }, { id }) {
      const result = await axios.get(`/farm/${id}`)
      commit('SET_FARM', result.data)
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
