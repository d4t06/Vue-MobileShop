<script setup>
import { useRoute } from 'vue-router';
import { watch, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/store/productStore';
import { useFiltersStore } from '@/store/filterStore';
import { getAllAndStoring } from '@/store/actions/';

import { banners } from '@/assets/data';
import NoProduct from './NoProduct.vue';
import ImageSlider from '@/components/ImageSlider/ImageSlider.vue';
import ProductItem from '@/components/ProductItem/ProductItem.vue';
import ProductFilter from '@/components/ProductFilter/ProductFilter.vue';
import Button from '@/components/Button/index.vue';
import QuickFilter from '@/components/QuickFilter/QuickFilter.vue';
import ProductSort from '../../components/ProductSort/ProductSort.vue';

const productsStore = useProductsStore();
const filtersStore = useFiltersStore();
const route = useRoute();
const curCategory = ref(route.params.category);

const { products, page, status } = storeToRefs(productsStore);
const { filters, sort } = storeToRefs(filtersStore);

const countProduct = computed(
   () => products.value.count - page.value * products.value.page_size
);

watch(
   route,
   async () => {
      curCategory.value = route.params.category;
      getAllAndStoring(productsStore, { category: curCategory.value, page: 1 });
   },
   { immediate: true }
);

const bannerImages = computed(() => {
   return banners[curCategory.value]
      .slice(0, banners[curCategory.value].length - 5)
      .split('*and*');
});

const handleGetMore = () => {
   const isFiltered = filters.value.brand || filters.value.price;

   getAllAndStoring(productsStore, {
      category: curCategory.value,
      filters: isFiltered ? filters.value : '',
      sort: sort.value.column ? sort.value : '',
      page: page.value + 1,
   });
};
</script>
<template>
   <div class="product-container">
      <ImageSlider :data="bannerImages" banner />

      <div class="product-body row">
         <div class="col col-9">
            <h1 class="mt10">
               {{ curCategory === 'dtdd' ? 'Điện thoại ' : 'Laptop ' }}
               (
               <strong style="color: red">{{ countProduct }}</strong>
               ) sản phẩm
            </h1>
            <QuickFilter />
            <ProductSort />

            <ProductItem v-if="products.rows.length" :data="products.rows" />

            <div class="pagination" v-if="products.rows.length">
               <Button
                  outline
                  rounded
                  :count="countProduct < 0 ? 0 : countProduct"
                  describe="sản phẩm"
                  @click="() => handleGetMore()"
                  :disable="!!(countProduct <= 0)"
                  hasIcon
                  :loading="status === 'loading'"
               >
                  Xem thêm
               </Button>
            </div>

            <NoProduct v-if="!products.rows.length" />
         </div>

         <ProductFilter :category="curCategory" />
      </div>
   </div>
</template>

<style scoped lang="scss">
@import './Product.module.scss';
</style>
