<script setup>
import { ref, computed } from "vue";

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
const productFilter = ref('');

const {sort} = storeToRefs(filterStore)

const showFilteredResults = (filters) => {
   getAllAndStore(productStore, {
      category: props.category,
      page: 1,
      sort: sort.value,
      filters,
   });
   filterStore.storingFilters({ filters, sort });
};

// const isFiltered =
//    (JSON.stringify(Filters.value) !== "{}" && Filters.value?.brand) ||
//    Filters.value?.price;

const isFiltered = computed(() => productFilter?.value.brand || productFilter?.value.price)

const handleFilter = (filter, by) => {
   // tao object
   let newFilter = { ...productFilter.value };

   // nếu chọn tất cả
   if (!filter) {
      delete newFilter[by];
   } else {
      newFilter[by] = filter;
   }

   // nếu không có filter gì cả
   if (!newFilter["brand"] && !newFilter["price"]) newFilter = "";

   productFilter.value = newFilter;
   showFilteredResults(newFilter);
};

console.log(isFiltered)
</script>

<template>
   <div class="brand-sort">
      <div class="quick-filter-container">
         <!-- <FilteredItem
            v-if="isFiltered"
            :category="category"
            :data="Filters"
            :handleFilter="handleFilter"
         /> -->
         <BrandList :data="brands[category]" :handleFilter="handleFilter" />
      </div>
   </div>
</template>

<style scoped lang="scss">
@import "./QuickFilter.module.scss";
</style>
