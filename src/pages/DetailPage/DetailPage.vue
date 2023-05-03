<script setup>
import { useRoute } from "vue-router";
import { watch, watchEffect, ref } from "vue";
import * as productServices from "../../services/productServices";

import ProductDetail from "../../components/ProductDetail/ProductDetail.vue";
import ProductItem from "../../components/ProductItem/ProductItem.vue";

const route = useRoute();
const product = ref();
const suggestProducts = ref();

watchEffect(async () => {
   const res = await productServices.getSuggest({
      'category':  route.params.category,
   });

   suggestProducts.value = res.data
});

watch(
   route,
   async () => {
      try {
         const response = await productServices.getProductDetail({
            'category': route.params.category,
            'href': route.params.href,
         });

         product.value = response.data[0];
      } catch (error) {
         console.log("detailPage error", { message: error });
      }
   },
   { immediate: true }
);
</script>

<template>
   <div class="wrapper">
      <ProductDetail v-if="product" :data="product" />

      <div class="row mt15">
         <div class="product-suggest">
            <h1 class="suggest-title">
               Xem thêm
               {{ route.params.category === "dtdd" ? "Điện thoại " : "Laptop " }}
               Khác
            </h1>
            <ProductItem v-if="suggestProducts" search :data="suggestProducts" />
         </div>
      </div>

      <h1 class="mt15 tac">Footer</h1>
   </div>
</template>

<style scoped lang="scss"></style>
