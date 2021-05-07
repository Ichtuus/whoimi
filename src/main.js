/* Styles */
import './style/scss/main.scss'

import Vue from 'vue'

import Buefy from 'buefy'
import axios from 'axios'
import store from './store'
import router from './router'

import App from './App.vue'

Vue.use(Buefy)

Vue.config.productionTip = true
axios.defaults.withCredentials = true

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
