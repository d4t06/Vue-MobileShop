<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useFiltersStore } from "@/store/filterStore";
import { useProductsStore } from "@/store/productStore";
import { getAllAndStoring } from "@/store/actions";

import { brands } from "../ProductFilter/childs/continents";
import BrandList from "./BrandList.vue";
import FilteredItem from "./FilteredItem.vue";

// sửa dụng productStore và filterStore
const filterStore = useFiltersStore();
const productStore = useProductsStore();

// lấy category url
const route = useRoute()
const category = computed(() => route.params.category)

// khai báo biến chứa các giá trị của filter
const productFilter = ref({brand: '', price: ''});

// destructor filterStore
const {sort, filters} = storeToRefs(filterStore)

const showFilteredResults = (newFilters) => {
   getAllAndStoring(productStore, {
      category: category.value,
      page: 1,
      sort: sort.value.column ? sort.value : '',
      filters: newFilters,
   });
   filterStore.storingFilters({ filters: newFilters, sort });
};

// chạy ngay lập tức, cập nhập filter từ store
watch(filterStore,
() => {
   productFilter.value = filters.value
},
{immediate: true}
)

// check có đang chọn filter hay không 
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
