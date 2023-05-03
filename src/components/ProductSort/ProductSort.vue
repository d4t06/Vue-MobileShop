<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '../../store/productStore';
import { useFiltersStore } from '../../store/filterStore'
import { getAllAndStoring } from '../../store/actions';

const continents = [
   {
      id: 1,
      value: 'Mới nhất',
      column: '',
      type: '',
   },
   {
      id: 2,
      value: 'Giá thấp',
      column: 'cur_price',
      type: 'asc',
   },
   {
      id: 3,
      value: 'Giá cao',
      column: 'cur_price',
      type: 'desc',
   },
   {
      id: 4,
      value: 'Trả góp 0%',
      column: 'intallment',
      type: true,
   },
];
// sử dụng store
const productStore = useProductsStore();
const filtersStore = useFiltersStore();
const route = useRoute();

// destructor store
const { category, status } = storeToRefs(productStore)
const { filters } = storeToRefs(filtersStore)

const checked = ref(1);

// kiểm tra xem có đang filter, nêu không sẽ không truyền lên khi fetch data
const isFiltered = computed(() => !!(filters.value.price || filters.value.brand || ''))

// lấy filter có giá trị
const handleFilter = computed(() => {
   if (!isFiltered.value) return '';

   if (!filters.value.brand && isFiltered) {
      return { price: filters.value.price }
   }
   if (!filters.value.price && isFiltered) {
      return { brand: filters.value.brand }
   }

   return filters.value
})

const handleToggle = (id) => {
   if (checked.value === id) return;

   checked.value = id;
   let sort = {};
   sort.column = continents[id - 1].column;
   sort.type = continents[id - 1].type;

   if (!sort.column) sort = '';
   // if (category.value.includes("search=")) {
   //    getAllSearchPage(productStore, {
   //       category: category.value,
   //       page: page.value,
   //       sort,
   //    });
   // } else {
   // }
   filtersStore.storingFilters({filters: handleFilter.value ,sort})

   getAllAndStoring(productStore, {
      category: category.value,
      page: 1,
      filters: handleFilter.value,
      sort,
   });
};

watch(route, () => {
   filtersStore.storingFilters({filters: '' ,sort: ''})
})
</script>

<template>
   <div :class="['product-sort', {disable: status === 'loading'}]">
      <h1>Xem theo</h1>
      <ul class="btn-group">
         <li v-for="(item, index) in continents" class="sort-btn" :class="{ active: item.id === checked }"
            @click="() => handleToggle(item.id)">
            {{ item.value }}
         </li>
      </ul>
   </div>
</template>
<style lang="scss">
.btn-group,
.product-sort {
   display: flex;
}

.product-sort {
   margin-top: 15px;
   align-items: center;

   h1 {
      margin-right: 20px;
   }
}

.btn-group {
   border: 1px solid #e1e1e1;

   .sort-btn {
      padding: 5px 10px;
      font-size: 1.6rem;
      border: 1px solid transparent;
      border-left-color: #e1e1e1;
      cursor: pointer;

      &:hover {
         border-color: #cd1818;
      }
   }

   .sort-btn.active {
      background-color: #cd1818;
      color: #fff;
      border-left-color: #cd1818;
   }
}
</style>
