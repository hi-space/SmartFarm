import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchButtons(ctx, queryParams) {
      const result = await axios.get('/button', { params: queryParams })
      return result
    },
    async fetchButton(ctx, { id }) {
      const result = await axios.get(`/button/${id}`)
      return result
    },
    async createButton(ctx, { queryBody }) {
      const result = await axios.post('/button', queryBody)
      return result
    },
    async updateButton(ctx, { id, queryBody }) {
      const result = await axios.put(`/button/${id}`, queryBody)
      return result
    },
    async deleteButton(ctx, { id }) {
      const result = await axios.delete(`/button/${id}`)
      return result
    },

    async addNewSetting(ctx, { id, queryBody }) {
      const result = await axios.post(`/button/${id}/setting`, queryBody)
      return result
    },
    async setSettings(ctx, { id, queryBody }) {
      const result = await axios.post(`/button/${id}/settings`, queryBody)
      return result
    },

    async fetchSettings(ctx, { id }) {
      const result = await axios.get(`/button/${id}/settings`)
      return result
    },
    async deleteSetting(ctx, { buttonId, settingId }) {
      const result = await axios.delete(`/button/${buttonId}/setting/${settingId}`)
      return result
    },

    async command(ctx, { id, queryBody }) {
      const result = await axios.post(`/button/${id}/command`, queryBody)
      return result
    },
  },
}
