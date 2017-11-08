import api from '../../api'

export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setData (state, data) {
      state.data = data
    }
  },
  actions: {
    async add ({dispatch, commit}, scan) {
      await api.scans.add(scan)
      await dispatch('reFetch')
    },
    async reFetch ({dispatch, commit}) {
      let data = await api.scans.fetch()
      commit('setData', data)
      return data
    },
    async remove ({dispatch, commit}, id) {
      await api.scans.remove(id)
      await dispatch('reFetch')
    },
    async update ({dispatch, commit}, id) {
      await api.scans.update(id)
      await dispatch('reFetch')
    }
  },
  getters: {
    all: (state) => state.data
  }
}
