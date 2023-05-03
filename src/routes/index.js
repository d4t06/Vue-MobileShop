import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/authStore";
import jwtDecode from "jwt-decode";
import authRequest from "../services/authService";

import Home from "../pages/Home/Home.vue";
import Dashboard from "../pages/Dashboard/Dashboard.vue";
import Unauthorized from "../pages/Unauthorized/Unauthorized.vue";
import User from "../pages/UserPage/UserPage.vue";
import Product from "../pages/Product/Product.vue";
import DetailPage from "../pages/DetailPage/DetailPage.vue";
import Login from "../pages/otherPages/Login.vue";
import Register from "../pages/otherPages/Register.vue";
import NotFound from "../pages/otherPages/NotFound.vue";
import SearchPage from "../pages/SearchPage/SearchPage.vue";

const isLogin = ref(false);
const isUnauthorized = ref(false)
const routes = [

   { path: "/", component: Home },
   { path: "/:category", component: Product },
   { path: "/:category/:href", component: DetailPage },

   // auth
   { path: "/login", component: Login },
   { path: "/register", component: Register },

   // search
   { path: "/search/:key", component: SearchPage },

   // unauthorized
   { path: "/unauthorized", component: Unauthorized },
   { path: "/user", component: User },

    // notfound
    { path: "/:pathMatch(.*)*", component: NotFound },

   // dashboard
   {
      path: "/dashboard",
      component: Dashboard,
      beforeEnter: async () => {
         if (!isLogin.value) return "/login";

         const authStore = useAuthStore();
         const decode = authStore.auth.token
            ? jwtDecode(authStore.auth.token)
            : "";

         if (!decode || decode.role_code != "R1") return "/unauthorized";
      },
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach(async (from, to) => {
   if (from.path === "/login" || from.path === "/register") return true;
   if ( isUnauthorized.value ) return true;

   const authStore = useAuthStore();
   try {
      if (!authStore.auth.token) {
         const response = await authRequest.get("/auth/refresh");
         authStore.storingAuth({ token: response.data.token });
         isLogin.value = true;
      }
   } catch (error) {
      if (!error?.response) {
         console.log("No server response");
      } else if (error.response.status === 401) {
         isUnauthorized.value = true
      }
   }
});

export default router;
