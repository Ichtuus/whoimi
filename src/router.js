import Vue from 'vue'
import Router from 'vue-router'

import NotFound from './views/NotFound'
import Home from './views/Home'
import AboutMe from './views/AboutMe'
import GitHub from './views/gitHub/GitHub'
import Front from './views/Front'
import Back from './views/Back'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about-me',
            name: 'AboutMe',
            component: AboutMe
        },
        {
            path: '/github',
            name: 'GitHub',
            component: GitHub
        },
        {
            path: '/front',
            name: 'Front',
            component: Front
        },
        {
            path: '/back',
            name: 'Back',
            component: Back
        },
        {
            path: '/not-found',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '*',
            redirect: { name: 'Home' }
        }
    ]
})

