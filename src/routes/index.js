import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import Product from "../pages/Product/Product.vue";
import DetailPage from "../pages/DetailPage/DetailPage.vue";
import Login from "../pages/otherPages/Login.vue";
import Register from "../pages/otherPages/Register.vue";
import NotFound from "../pages/otherPages/NotFound.vue";

const routes = [
   // comom
   { path: "/", component: Home },
   { path: "/:category", component: Product },
   { path: "/:category", component: Product },
   { path: "/:category/:href", component: DetailPage },

   // auth
   { path: "/login", component: Login },
   { path: "/register", component: Register },

   // notfound
   { path: "/:pathMatch(.*)*", component: NotFound },


];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export default router;
