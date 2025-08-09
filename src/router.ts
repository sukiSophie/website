import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: () => import('./views/Home.vue') 
    },
    { 
        path: '/blog', 
        name: 'Blog', 
        component: () => import('./views/Blog.vue') 
    },
    { 
        path: '/blog/:id', 
        name: 'BlogDetail', 
        component: () => import('./views/BlogDetail.vue') 
    },
]

const router = createRouter({
    history: createWebHistory(),
    // history:createWebHashHistory,
    routes,
})

export default router 