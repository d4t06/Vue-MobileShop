<script setup>
import { ref, computed } from "vue";
import Checkbox from "./childs/Checkbox.vue";
import Radiobox from "./childs/Radiobox.vue";
import { brands, prices } from "./childs/continents.js";

import { getAllAndStore } from "../../store/actions";
import { useProductsStore } from "../../store/productStore";
import { useFiltersStore } from "../../store/filterStore";

const productFilter = ref({});
const props = defineProps({
   category: String,
});
const productStore = useProductsStore();
const filterStore = useFiltersStore();

const { page, sort } = computed(() => {
   return {
      page: productStore.page,
      sort: filterStore.sort,
   };
});

const showFilteredResults = (filters) => {
   getAllAndStore(productStore, {
      category: props.category,
      page: 1,
      sort,
      filters,
   });
   filterStore.storingFilters({ filters, sort });
};

const handleFilter = (filter, by) => {
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
</script>

<template>
   <div class="col col-3">
      <div class="product-filter">
         <div class="filter-section">
            <h2 class="filter-title">Hãng sản xuất</h2>
            <div class="filter-list">
               <Checkbox
                  :data="brands[category]"
                  :handleFilter="handleFilter"
               />
               <!-- truyền handleFilter vào cop Checkbox, chực hiện sau trể về đối số là filter sau đó tt -->
            </div>
         </div>
         <div class="filter-section">
            <h2 class="filter-title">Mức giá</h2>
            <div class="filter-list price">
               <Radiobox
                  :data="prices[category]"
                  :handleFilter="handleFilter"
               />
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
