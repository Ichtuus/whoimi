import Vue from 'vue'
import Router from 'vue-router'

import NotFound from './views/NotFound'
import Home from "./views/Home";
Vue.use(Router)

const routes = [
    // {
    //     path: '/',
    //     redirect: { name: 'Home' }
    // },
    {
        meta: {
            title: 'Dashboard'
        },
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: NotFound
    },
    {
        path: '*',
        redirect: { name: 'not-found' }
    }
]


const router = new Router({
    base: process.env.BASE_URL,
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

export default router
