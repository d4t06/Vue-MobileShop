<script setup>
import {useRoute} from 'vue-router'
import {watch, ref, computed} from 'vue'
import { storeToRefs } from 'pinia'
import {useProductStore} from "../../store/productStore"
import * as productServices from '../../services/productServices'
import {getAllAndStore} from '@/store/actions/'

import ImageSlider from "../../components/ImageSlider/ImageSlider.vue";
import ProductItem from "../../components/ProductItem/ProductItem.vue";
import ProductFilter from "../../components/ProductFilter/ProductFilter.vue";
import Button from '../../components/Button/index.vue'
import QuickFilter from '../../components/QuickFilter/QuickFilter.vue';

import { banners } from "../../assets/data";

const productStore = useProductStore();
const route = useRoute()
const curCategory = ref(route.params.category)

// props
const {products, page} = storeToRefs(productStore)

watch(route, async() => {
  curCategory.value = route.params.category;

  // getAllAndStore(productStore, {category: curCategory.value, page: 1});
}, {immediate: true})

const bannerImages = computed(() => {
  return banners[curCategory.value].slice(0, banners[curCategory.value].length - 5).split("*and*");
})

const handleGetMore = () => {
  getAllAndStore({category: curCategory, page: page + 1})
}


</script>
<template>
  <div class="product-container">
    <ImageSlider :data="bannerImages"
    banner />

    <div class="product-body row">
      <div class="col col-9">
        
        <!-- ref in template not .value -->
        <QuickFilter :category="curCategory" />

        <ProductItem :data="products.rows" />

        <div class='pagination'>
          <Button
              outline
              rounded
              :count="products.count"
              describe="sản phẩm"
              :click="() => handleGetMore()"
          >
              Xem thêm
          </Button>
        </div>

        <!-- <div className='pagination'>
                  <Button outline rounded :count="countProduct" describe="sản phẩm">
                     Xem thêm
                  </Button>
               </div> -->
      </div>

      <ProductFilter :category="curCategory"/>
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
