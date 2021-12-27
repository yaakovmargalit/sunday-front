import Vue from 'vue'
import Vuex from 'vuex'
import { userStore } from './user.store.js'
import { boardStore } from './board.store.js'
import { itemStore } from './item.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {},
    actions: {},
    modules: {
        userStore,
        boardStore,
        itemStore
    }
})