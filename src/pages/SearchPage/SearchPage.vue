<script setup>
import { useRoute } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/store/productStore';

import { getAllSearchPage } from '@/store/actions/';

import ProductItem from "@/components/ProductItem/ProductItem.vue";
import Button from "@/components/Button/index.vue";


const productsStore = useProductsStore();
const isLoading = ref(false);
const route = useRoute();
const key = ref(route.params.key);

const { products, category, page } = storeToRefs(productsStore);

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
            getAllSearchPage(productsStore, {
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

const handleGetMore = () => {};
</script>
<template>
   <div class="product-container">
      <h1 v-if="isLoading">Loading...</h1>
      <div v-if="!isLoading && products.rows?.length" class="product-body row">
         <div class="col-full">
            <h1 class="search-page-title">
               Tìm thấy
               <span style="color: #cd1818">
                  {{ products.rows.length || 0 }} </span
               > kết quả cho từ khóa {{ key }}
            </h1>

            <!-- <h1>Kết quả tìm kiếm cho từ khóa {{key}}</h1> -->

            <ProductSort :category="category" />
            <div class="products-container">
               <div class="row">
                  <ProductItem v-if="products.rows" :data="products.rows" search/>
               </div>
            </div>
            <div class="pagination">
               <Button
                  outline
                  rounded
                  :count="countProduct < 0 ? 0 : countProduct"
                  describe="sản phẩm"
                  @click="() => handleGetMore()"
                  :disable="countProduct <= 0"
               >
                  Xem thêm
               </Button>
            </div>
         </div>
      </div>
      <h1 v-if="!isLoading && !products.rows?.length">Không tìm thấy</h1>
   </div>
</template>
<style scoped lang="scss">
@import 'SerchPage.module.scss';
</style>
