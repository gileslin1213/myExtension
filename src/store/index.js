import { createStore } from 'vuex'
import tab from './module/tab'
import menu from './module/menu'
import list from './module/list'

const store = createStore({
  modules: {
    tab, 
    menu,
    list
  }
})

export default store
