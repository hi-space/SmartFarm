import axios from '@axios'

export default {
  namespaced: true,
  state: {
    buttons: [],
  },
  getters: {
    getButtonCheckbox(state) {
      const buttonList = state.buttons
      return buttonList.map((obj => {
        const rObj = {}
        rObj.text = obj.name
        rObj.value = obj._id
        return rObj
      }))
    },
    getButtonTypes: state => farmId => {
      let { buttons } = state

      if (farmId !== '') buttons = buttons.filter((obj => obj.farmId._id === farmId))

      return buttons
        .map((obj => obj.type))
        .reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), [])
        .map((obj => {
          const rObj = {}
          rObj.value = obj
          if (obj === 'curtain') rObj.label = '커튼'
          else if (obj === 'ceiling') rObj.label = '천장'
          else if (obj === 'feeder') rObj.label = '사료급이기'
          else if (obj === 'light') rObj.label = '조명'
          else if (obj === 'fan') rObj.label = '선풍기'
          else if (obj === 'sprayer') rObj.label = '안개분무기'
          else if (obj === 'inverter') rObj.label = '인버터'
          return rObj
        }))
    },
    getButtonInType: state => type => state.buttons.filter((obj => obj.type === type)),
    getButtonInTypeOptions: state => type => state.buttons
      .filter((obj => obj.type === type))
      .map((obj => {
        const rObj = {}
        rObj.text = `(${obj.farmId.name}) ${obj.name}`
        rObj.value = obj._id
        return rObj
      })),
  },
  mutations: {
    SET_BUTTONS(state, buttons) {
      state.buttons = buttons
    },
  },
  actions: {
    async fetchButtons({ commit }, queryParams) {
      const result = await axios.get('/button', { params: queryParams })
      commit('SET_BUTTONS', result.data)
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

    async addSettingMany(ctx, { queryBody }) {
      const result = await axios.post('/button/settings', queryBody)
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
