<script setup>
import { useRoute } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/store/productStore';
import { useFiltersStore } from '../../store/filterStore';

import { getAllAndStoring } from '@/store/actions/';

import ProductItem from '@/components/ProductItem/ProductItem.vue';
import Button from '@/components/Button/index.vue';
import ProductSort from '../../components/ProductSort/ProductSort.vue';
import NoProduct from '../Product/NoProduct.vue';

const productsStore = useProductsStore();
const filterStore = useFiltersStore()

const route = useRoute();
const key = ref(route.params.key);
const isLoading = ref(false);

const { sort } = storeToRefs(filterStore)
const { products, page, status } = storeToRefs(productsStore);

const countProduct = computed(
   () => products.value.count - page.value * products.value.page_size
);

watch(
   route,
   () => {
      key.value = route.params.key;
      console.log(key.value);
      const fetch = async () => {
         if (!key.value) return;
         try {
            isLoading.value = true;
            getAllAndStoring(productsStore, {
               category: `search=${key.value}`,
               page: 1,
            });
         } catch (error) {
            console.log({ message: error });
         } finally {
            setTimeout(() => {
               isLoading.value = false;
            }, 1000);
         }
      };
      fetch();
   },
   { immediate: true }
);

const handleGetMore = () => {
   getAllAndStoring(productsStore, {
               category: `search=${key.value}`,
               page: page.value + 1,
               sort: sort.value
});
};
</script>
<template>
   <div class="product-container">
      <!-- loading icon -->
      <i v-if="isLoading" class="material-icons loading">sync</i>

      <!-- main container -->
      <div v-if="!isLoading && products.rows?.length" class="product-body row">
         <div class="col-full">
            <h1 class="search-page-title">
               Tìm thấy
               <span style="color: #cd1818">
                  {{ products.count || 0 }}
               </span>
               kết quả cho từ khóa "{{ key }}"
            </h1>

            <ProductSort />

            <ProductItem v-if="products.rows" :data="products.rows" search />

            <div class="pagination">
               <Button
                  outline
                  rounded
                  hasIcon
                  :count="countProduct < 0 ? 0 : countProduct"
                  :disable="!!(countProduct <= 0)"
                  :loading="status === 'loading'"
                  describe="sản phẩm"
                  @click="() => handleGetMore()"
               >
                  Xem thêm
               </Button>
            </div>
         </div>
      </div>

      <!-- no product -->
      <div v-if="!isLoading && !products.rows?.length" class="no-result">
         <h1>Kết quả tìm kiếm cho từ khóa "{{ key }}"</h1>
         <NoProduct />
      </div>
   </div>
</template>
<style scoped lang="scss">
@import '../Product/Product.module.scss';
</style>
