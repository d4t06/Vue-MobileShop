<script setup>
const props = defineProps({
   data: Array,
   handleFilter: Function,
});
</script>

<template>
   <div
      v-for="item in data.filter((item) => item.image)"
      class="sort-item"
      @click="() => props.handleFilter([item.href], 'brand')"
   >
      <img :src="item.image" alt="" />
   </div>
</template>

<style scoped lang="scss">
@import './QuickFilter.module.scss';
</style>
