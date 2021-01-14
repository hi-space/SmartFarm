import axios from '@axios'

export default {
  namespaced: true,
  state: {
    cctvs: [],
  },
  getters: {},
  mutations: {
    SET_CCTV(state, cctvs) {
      state.cctvs = cctvs
    },
    CLEAR_CCTV(state) {
      state.cctvs = []
    },
  },
  actions: {
    async fetchCCTVs({ commit }, queryParams) {
      const result = await axios.get('/cctv', { params: queryParams })
      commit('SET_CCTV', result.data)
      return result
    },
    async fetchCCTV(ctx, { id }) {
      const result = await axios.get(`/cctv/${id}`)
      return result
    },
    async createCCTV(ctx, { queryBody }) {
      const result = await axios.post('/cctv', queryBody)
      return result
    },
    async updateCCTV(ctx, { id, queryBody }) {
      const result = await axios.put(`/cctv/${id}`, queryBody)
      return result
    },
    async deleteCCTV(ctx, { id }) {
      const result = await axios.delete(`/cctv/${id}`)
      return result
    },
  },
}
