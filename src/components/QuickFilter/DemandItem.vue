<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   data: Array
})
</script>

<template>
   <div
      v-for="item in data.filter(item => item.image)"
      class='sort-item'
      >
         <img :src="item.image" alt="" />
   </div>
</template>

<style scoped lang="scss">
@import "./QuickFilter.module.scss"
</style>