<script setup>
import { computed } from "vue";
import jwtDecode from "jwt-decode";
import { useAuthStore } from "../../store/authStore";
import { headPhoneIcons, laptopIcon, mobileIcons } from "../../assets/icons";
import Search from "../../components/Search/Search.vue";

const authStore = useAuthStore();

const decode = computed(() => {
   return authStore.auth.token ? jwtDecode(authStore.auth.token) : "";
});

</script>
<template>
   <div class="header">
      <div class="header-banner">
         <img
            src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/1200-44-1200x44-8.png"
            alt=""
         />
      </div>
      <div class="header-top">
         <div class="container header-top-wrap">
            <RouterLink class="brand" to="/"> HD Shop </RouterLink>
            <Search />
            <div v-if="decode.username" class="user-cta">
               <span class="user-name">Nguyễn Hữu Đạt</span>
               <div class="image-frame">
                  <img
                     class="user-image"
                     src="../../assets/images/avatar.jpg"
                     alt=""
                  />
               </div>
            </div>
            <div v-else class="user-cta"></div>
         </div>
      </div>
      <div class="header-nav">
         <div class="container header-nav-wrap">
            <ul class="nav-list">
               <li class="nav-item">
                  <RouterLink to="/dtdd">
                     <mobileIcons />
                     <p class="nav-text">Điện thoại</p>
                  </RouterLink>
               </li>
               <li class="nav-item">
                  <RouterLink to="/laptop">
                     <laptopIcon />
                     <p class="nav-text">Laptop</p>
                  </RouterLink>
               </li>
               <li class="nav-item">
                  <RouterLink to="/laptop">
                     <headPhoneIcons />
                     <p class="nav-text">Phụ kiện</p>
                  </RouterLink>
               </li>
            </ul>

            <ul class="nav-list">
               <li class="nav-item">
                  <RouterLink to="/login">
                     <p class="nav-text">Đăng nhập</p>
                  </RouterLink>
               </li>
               <li class="nav-item">
                  <RouterLink to="/register">
                     <p class="nav-text">Đăng ký</p>
                  </RouterLink>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<style scoped lang="scss">
// @import '../../assets/themify-icons/themify-icons.css';
@import "./Header.module.scss";
</style>
