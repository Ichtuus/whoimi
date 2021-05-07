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
            path: '/whoimi',
            name: 'Home',
            component: Home
        },
        {
            path: '/whoimi/about-me',
            name: 'AboutMe',
            component: AboutMe
        },
        {
            path: '/whoimi/github',
            name: 'GitHub',
            component: GitHub
        },
        {
            path: '/whoimi/front',
            name: 'Front',
            component: Front
        },
        {
            path: '/whoimi/back',
            name: 'Back',
            component: Back
        },
        {
            path: '/whoimi/not-found',
            name: 'not-found',
            component: NotFound
        },
        {
            path: '*',
            redirect: { name: 'Home' }
        }
    ]
})

