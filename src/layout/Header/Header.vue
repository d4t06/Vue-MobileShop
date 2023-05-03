<script setup>
import { computed, ref } from "vue";
import jwtDecode from "jwt-decode";
import { useAuthStore } from "../../store/authStore";
import { headPhoneIcons, laptopIcon, mobileIcons, gearIcon, addIcon } from "../../assets/icons";

import Search from "../../components/Search/Search.vue";
import Modal from "../../components/Modal/Modal.vue";

const authStore = useAuthStore();
const isShowModal = ref(false);

const decode = computed(() => {
   return authStore.auth.token ? jwtDecode(authStore.auth.token) : "";
});
const setShowModal = (value) => isShowModal.value = value;

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
            <Search @setShowModal="setShowModal" />
            <div v-if="decode.username" class="user-cta">
               <span class="user-name">{{decode.username}}</span>
               <RouterLink to="/user" class="image-frame">
                  <img
                     class="user-image"
                     src="../../assets/images/avatar.jpg"
                     alt=""
                  />
               </RouterLink>
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
            </ul>

            <ul v-if="!decode" class="nav-list">
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

            <ul v-if="decode.role_code === 'R1'" class="nav-list">
               <li class="nav-item">
                  <RouterLink to="/dashboard">
                     <gearIcon/>
                     <p class="nav-text">Admin</p>
                  </RouterLink>
               </li>
            </ul>
            
         </div>
      </div>
   </div>
   <Modal v-if="isShowModal"/>
</template>
<style scoped lang="scss">
@import "./Header.module.scss";
</style>
