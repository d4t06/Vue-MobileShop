<script setup>
import { brands } from '../ProductFilter/childs/continents';
import { defineProps } from 'vue';
import DemandItem from './DemandItem.vue';
const props = defineProps({
   category: String,
   handleFilter: () => {}
});


console.log(props.category)
</script>

<template>
   <div class="brand-sort">
      <div class="quick-filter-container">
         <!-- <SelectedSort v-if="isFiltered" :category="category" :data="Filters" /> -->
         <DemandItem :data="brands[category]" />
      </div>
   </div>
</template>

<style scoped lang="scss">
@import "./QuickFilter.module.scss";
</style>
