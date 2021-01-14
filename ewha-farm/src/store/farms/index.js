import axios from '@axios'

export default {
  namespaced: true,
  state: {
    farm: null,
  },
  getters: {},
  mutations: {
    SET_FARM(state, farm) {
      state.farm = farm
    },
    CLEAR_FARM(state) {
      state.farm = null
    },
  },
  actions: {
    async fetchFarms({ commit }, queryParams) {
      const result = await axios.get('/farm', { params: queryParams })
      commit('CLEAR_FARM')
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
