<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   data: Array,
   handleFilter: Function,
})


console.log("handleFilter =", props.handleFilter);
</script>

<template>
   <div
      v-for="item in data.filter(item => item.image)"
      class='sort-item'
      @click="() => props.handleFilter(item.href, 'brand')"
      >
         <img :src="item.image" alt="" />
   </div>
</template>

<style scoped lang="scss">
@import "./QuickFilter.module.scss"
</style>