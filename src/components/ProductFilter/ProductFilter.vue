<script setup>
import { ref, computed, watch } from "vue";
import Checkbox from "./childs/Checkbox.vue";
import Radiobox from "./childs/Radiobox.vue";
import { brands, prices } from "./childs/continents.js";

import { getAllAndStoring } from "../../store/actions";
import { useProductsStore } from "../../store/productStore";
import { useFiltersStore } from "../../store/filterStore";
import { storeToRefs } from "pinia";

const props = defineProps({
   category: String,
});
const productFilter = ref({
   filters: { brand: "", price: "" },
});
const productStore = useProductsStore();
const filterStore = useFiltersStore();

const { filters, sort } = storeToRefs(filterStore);

const showFilteredResults = (newFilters) => {
   getAllAndStoring(productStore, {
      category: props.category,
      // khi filter, sẽ reset page về 1
      page: 1,

      // kiểm tra xem có sort hay không
      // nếu không sẽ không truyền lên khi fetch data
      sort: sort.value.column ? sort.value : "",

      filters: newFilters,
   });
   filterStore.storingFilters({ filters: newFilters, sort: sort.value });
};

watch(
   filterStore,
   () => {
      productFilter.value = filters.value;
   },
   { immediate: true }
);

const handleFilter = (filter, by) => {
   let newFilter = { ...productFilter.value };

   newFilter[by] = filter;

   // nếu không có filter gì cả
   if (!newFilter["brand"]) delete newFilter["brand"];
   if (!newFilter["price"]) delete newFilter["price"];

   productFilter.value = newFilter;
   showFilteredResults(newFilter);
};
</script>

<template>
   <div class="col col-3">
      <div class="product-filter">
         <div class="filter-section">
            <h2 class="filter-title">Hãng sản xuất</h2>
            <div class="filter-list">
               <Checkbox :data="brands[category]" :handleFilter="handleFilter" />
            </div>
         </div>
         <div class="filter-section">
            <h2 class="filter-title">Mức giá</h2>
            <div class="filter-list price">
               <Radiobox :data="prices[category]" :handleFilter="handleFilter" />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped lang="scss">
.product-filter {
   padding: 10px;
   padding-top: 15px;
   margin-left: 30px;
}

.filter-section {
   margin-bottom: 25px;
   padding-left: 5px;
}

.filter-title {
   margin-bottom: 15px;
   font-weight: 600;
}

.filter-list {
   display: flex;
   flex-wrap: wrap;
   column-gap: 15px;
   row-gap: 17px;
}

.price {
   flex-direction: column;
}
</style>
