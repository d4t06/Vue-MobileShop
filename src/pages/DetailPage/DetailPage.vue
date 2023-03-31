<script setup>

import {watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import * as productServices from '../../services/productServices';
import ProductDetail from '../../components/ProductDetail/ProductDetail.vue';

const route = useRoute();
const data = ref('');
const {category, href} = route.params

watch(route, async () => {
   try {
      const response = await productServices.getProductDetail({
         category,
         href,
      });

      data.value = response.data;
   } catch (error) {
      console.log('detailPage error', { message: error });
   }

},
{immediate: true}
);

</script>

<template>
   <div class="wrapper">
      <ProductDetail v-if="data" :data="data[0]"/>
   </div>
</template>

<style scoped lang="scss">
</style>
