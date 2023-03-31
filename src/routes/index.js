import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Product from '../pages/Product/Product.vue'
import DetailPage from '../pages/DetailPage/DetailPage.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/:category', component: Product},
    {path: '/:category', component: Product},
    {path: '/:category/:href', component: DetailPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router