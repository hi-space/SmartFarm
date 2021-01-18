import axios from '@axios'

export default {
  namespaced: true,
  state: {
    housings: [],
  },
  getters: {
    getHousingSelect: state => farmId => state.housings
      .filter(el => el.farmId._id === farmId)
      .map((obj => {
        const rObj = {}
        rObj.label = obj.name
        rObj.value = obj._id
        return rObj
      })),
  },
  mutations: {
    SET_HOUSING(state, housings) {
      state.housings = housings
    },
    CLEAR_HOUSING(state) {
      state.housing = []
    },
  },
  actions: {
    async fetchHousings({ commit }, queryParams) {
      const result = await axios.get('/housing', { params: queryParams })
      commit('SET_HOUSING', result.data)
      return result
    },
    async fetchHousing(ctx, { id }) {
      const result = await axios.get(`/housing/${id}`)
      return result
    },
    async createHousing(ctx, { queryBody }) {
      const result = await axios.post('/housing', queryBody)
      return result
    },
    async updateHousing(ctx, { id, queryBody }) {
      const result = await axios.put(`/housing/${id}`, queryBody)
      return result
    },
    async deleteHousing(ctx, { id }) {
      const result = await axios.delete(`/housing/${id}`)
      return result
    },
  },
}
