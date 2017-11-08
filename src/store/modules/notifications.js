import Memory from '../../api/Memory'

let memory = new Memory({data: []})

export default {
  namespaced: true,
  state: {
    data: memory.data
  },
  mutations: {
    add (state, data) {
      let id = Date.now()
      memory.add({
        id,
        type: data.type,
        msg: data.msg
      })
      if (data.type !== 'error') {
        setTimeout(() => {
          this.commit('notifications/remove', id)
        }, 3000)
      }
    },
    remove (state, id) {
      memory.remove(id)
    }
  },
  actions: {},
  getters: {
    all: (state) => state.data
  }
}
