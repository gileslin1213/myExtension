export default {
  namespaced: true,
  state: {
    folder: '',
    items: []
  },
  mutations: {
    UPDATE_FOLDER(state, payload) {
      state.folder = payload
    },
    UPDATE_FOLDER_ITEMS(state, payload) {
      state.items = payload
    }
  },
  actions: {
    changeFolder({ commit, dispatch }, payload) {
      commit('UPDATE_FOLDER', payload)
      dispatch('updateFolderItems')
    },
    updateFolderItems({ commit, state }) {
      commit('UPDATE_FOLDER_ITEMS')
    }
  }
}
