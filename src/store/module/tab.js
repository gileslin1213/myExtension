export default {
  namespaced: true,
  state: {
    currentTabs: [],
    tabList: []
  },
  mutations: {
    UPDATE_TABS(state, payload) {
      state.currentTabs = payload
    },
    ADD_TAG_LIST(state, payload) {
      state.tabList.push(payload)
    }
  },
  actions: {
    listenerInit({ dispatch }) {
      const listener = ['onCreated', 'onMoved', 'onRemoved', 'onUpdated']
      listener.forEach((event) =>
        chrome.tabs[event].addListener(() => dispatch('updateTabs'))
      )
      dispatch('updateTabs')
    },
    updateTabs({ commit }) {
      chrome.tabs.query({ pinned: false }, (tabs) => {
        commit('UPDATE_TABS', tabs)
      })
    },
    moveTabs(context,{id,index}) {
      console.log(id,index);
      chrome.tabs.move(id, { index: index })
    },
    removeTabs(context,payload) {
      chrome.tabs.remove(payload)
    },
    addTagList({ commit }, payload) {
      commit(ADD_TAG_LIST, payload)
    }
  }
}
