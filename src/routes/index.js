import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Product from '../pages/Product/Product.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/:category', component: Product}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router