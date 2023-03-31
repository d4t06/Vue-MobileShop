<script setup>
import { ref, computed, watch } from "vue";

import { brands } from "../ProductFilter/childs/continents";
import { defineProps } from "vue";
import BrandList from "./BrandList.vue";
import FilteredItem from "./FilteredItem.vue";
import { useFiltersStore } from "../../store/filterStore";
import { useProductsStore } from "../../store/productStore";
import { getAllAndStore } from "../../store/actions";
import { storeToRefs } from "pinia";

const props = defineProps({
   category: String
});

const filterStore = useFiltersStore();
const productStore = useProductsStore();
const productFilter = ref({brand: '', price: ''});

const {sort, filters} = storeToRefs(filterStore)

const showFilteredResults = (newFilters) => {
   getAllAndStore(productStore, {
      category: props.category,
      page: 1,
      sort: sort.value.column ? sort.value : '',
      filters: newFilters,
   });
   filterStore.storingFilters({ filters: newFilters, sort });
};

watch(filterStore,
() => {
   productFilter.value = filters.value
},
{immediate: true}
)
const isFiltered = computed(() => !!(productFilter.value.brand || productFilter.value.price))

const handleFilter = (filter, by) => {
   // tao object
   let newFilter = { ...productFilter.value };

   if (by === 'clear') {
      newFilter = '';
   } else {
      newFilter[by] = filter;
         // nếu không có filter gì cả
         if (!newFilter['brand']) delete newFilter['brand']
         if (!newFilter['price']) delete newFilter['price']
   }




   productFilter.value = newFilter;
   showFilteredResults(newFilter);
};

console.log('isFiltered = ', isFiltered.value)
</script>

<template>
   <div class="brand-sort">
      <div class="quick-filter-container">
         <FilteredItem
            v-if="isFiltered"
            :category="category"
            :data="productFilter"
            :handleFilter="handleFilter"
         />
         <BrandList v-else :data="brands[category]" :handleFilter="handleFilter" />
      </div>
   </div>
</template>

<style scoped lang="scss">
@import "./QuickFilter.module.scss";
</style>
