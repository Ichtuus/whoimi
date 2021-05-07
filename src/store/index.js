import Vue from 'vue'
import Vuex from 'vuex'

import gitHub from '../store/modules/gitHub'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        gitHub
    },
    strict: debug
})
