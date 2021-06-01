import Vue from 'vue'
import Router from 'vue-router'

import NotFound from './views/NotFound'
import Home from './views/Home'
import AboutMe from './views/AboutMe'
import GitHub from './views/gitHub/GitHub'

Vue.use(Router)

export default new Router({
    mode: 'hash',
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

