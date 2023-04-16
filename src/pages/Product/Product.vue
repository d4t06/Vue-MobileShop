<script setup>
import { useRoute } from "vue-router";
import { watch,  ref, computed } from "vue";
import { storeToRefs } from "pinia";
import config from "@/config";

import { useProductsStore } from "@/store/productStore";
import { useFiltersStore } from "@/store/filterStore";

import { getAllAndStoring } from "@/store/actions/";

import ImageSlider from "@/components/ImageSlider/ImageSlider.vue";
import ProductItem from "@/components/ProductItem/ProductItem.vue";
import ProductFilter from "@/components/ProductFilter/ProductFilter.vue";
import Button from "@/components/Button/index.vue";
import QuickFilter from "@/components/QuickFilter/QuickFilter.vue";

import { banners } from "@/assets/data";

const productsStore = useProductsStore();
const filtersStore = useFiltersStore();
const route = useRoute();
const curCategory = ref(route.params.category);

const { products, page } = storeToRefs(productsStore);
const { filters, sort } = storeToRefs(filtersStore);

const countProduct = computed(() => productsStore.getCount - page.value * config.pageSize)

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
      .split("*and*");
});

const handleGetMore = () => {
   const isFiltered = filters.value.brand || filters.value.price
   
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
            <QuickFilter :category="curCategory" />

            <ProductItem v-if="products.rows" :data="products.rows" />

            <div class="pagination" v-if="products.rows">
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

            <div v-if="!products.rows">
               <h1>Không có sản phẩm nào</h1>
            </div>
         </div>

         <ProductFilter :category="curCategory" />
      </div>
   </div>
</template>

<style scoped lang="scss">
.product-container {
   margin-top: 20px;
}

.product-header {
   padding: 0 20px;
   border-bottom: 1px solid #cd1818;
   margin-top: 20px;

   p {
      font-size: 2.3rem;
      font-weight: 500;
   }
}
.product-body {
   margin-top: 15px;
}
.pagination {
   margin-top: 15px;
   text-align: center;
}
.no-product {
   text-align: center;
   margin-top: 50px;
   .image-frame {
      width: 100%;
      height: 184px;
      img {
         height: 100%;
      }
   }
}
</style>
