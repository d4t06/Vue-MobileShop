<script setup>
import Search from '../Search/Search.vue'
// import styles from './Header.module.scss'

</script>
<template>

    <div class="header">
            <div class="header-banner">
               <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/1200-44-1200x44-8.png" alt="" />
            </div>
            <div class=header-top>
               <div class="container header-top-wrap">
                  <RouterLink class="brand" to="/">
                     HD Shop
                  </RouterLink>
               <!-- <Search setShowModal={setShowModal}/> -->
               <Search/>
                  <div class="user-cta">
                     <span class="user-name">Nguyễn Hữu Đạt</span>
                     <div class="image-frame">
                        <img class="user-image" src='../../assets/images/avatar.jpg' alt="" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="header-nav">
               <div class="container header-nav-wrap">
                  <ul class="nav-list">
                     <li class="nav-item">
                     
                        <RouterLink to="/product"
                        >
                           <!-- <MdPhoneaRing/> -->
                           <span class="ti-mobile"></span>
                           <p class='nav-text'>Điện thoại</p>
                           </RouterLink>
                     </li>
                     <li class="nav-item">
                        <RouterLink to="/laptop" 
                        >
                           <!-- <BsLaptop/> -->
                           <span class="ti-desktop"></span>
                           <p class='nav-text'>Laptop</p>
                           </RouterLink>
                     </li>
                     <li class="nav-item">
                        <RouterLink to="/laptop">
                           <!-- <BsHeadphones/> -->
                           <span class="ti-headphone"></span>
                           <p class='nav-text'>Phụ kiện</p>
                        </RouterLink>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
</template>
<style lang="scss">
// @import '../../assets/themify-icons/themify-icons.css';
@import './Header.module.scss'
</style>