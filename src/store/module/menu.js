
export default {
  namespaced: true,
  state: {
    folderList: []
  },
  mutations: {
    UPDATE_FOLDER_LIST(state, payload) {
      state.folderList = payload
    }
  },
  actions: {
    updateFolderList({commit}){
      commit('UPDATE_FOLDER_LIST',array)
    },
    editFolderName(context, payload) {
      // context.commit('test1Mutation1');
      console.log('menu')
    },
    appendFolder(context, payload){

    },
    removeFolder(context, payload) {
      // context.commit('test1Mutation1');
      console.log('menu')
    },
  }
}
