import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Product from '../pages/Product/Product.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/dtdd', component: Product},
    {path: '/laptop', component: Product},
    {path: '/phukien', component: Product},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router