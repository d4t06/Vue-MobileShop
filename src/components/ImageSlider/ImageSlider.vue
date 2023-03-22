<script setup>
   const props = defineProps({
      data: Array,
      banner: Boolean
   })

console.log(props);
// import styles from './Header.module.scss'

</script>

<template>
      <div class="image-slider-frame">
         <div :class="{banner : props.banner}" class="image-slider">

            <div class="left-arrow slider-control">
               <!-- <i className="fa-solid fa-chevron-left"></i> -->
               <span class="ti-angle-left"></span>
            </div>
            <div class="right-arrow slider-control">
               <!-- <i className="fa-solid fa-chevron-left"></i> -->
               <span class="ti-angle-right"></span>

            </div>
            <div class="slider-item">
               <img src="https://cdn.tgdd.vn/2022/10/banner/800-200-800x200-142.png" alt="">
            </div>

         </div>
      </div>
</template>

<style lang="scss">
// @import '../../assets/themify-icons/themify-icons.css';
@import './ImageSlider.module.scss'
</style>