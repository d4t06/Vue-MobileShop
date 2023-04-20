<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import debounce from "lodash.debounce";
import * as productServices from "../../services/productServices";

const query = ref("");
const isLoading = ref(false);
const products = ref("");
const route = useRoute()

const saveSearchChange = debounce(async () => {
   if (!query) return;
   try {
      isLoading.value = true;
      const response = await productServices.search({ q: query.value });
      products.value = response.data.rows || "";
   } catch (error) {
      console.log({ message: error });
   } finally {
      setTimeout(() => {
         isLoading.value = false;
      }, 1000);
      // isLoading.value = false
   }
}, 900);
watch(query, () => {
   // if (!query) {
   //    isLoading.value = false;
   //    return
   // }
   saveSearchChange();
});

const handleClear = () => {
   query.value = "";
};
const handleSubmit = (e) => {
   e.preventDefault;
   route.push(`/search/${query}`);

}
</script>
<template>
   <div class="wrap">
      <form class="form" @submit="event => handleSubmit(event)" action="">
         <input
            class="input"
            type="text"
            placeholder="Hôm nay bạn muốn tìm gì..."
            v-model="query"
         />
         <button v-if="query && !isLoading" class="clear-btn" >
            <i class="material-icons">cancel</i>
         </button>
         <button v-if="isLoading && query" class="loading-btn">
            <i class="material-icons">sync</i>
         </button>
         <button class="search-btn">
            <span class="material-icons">search</span>
         </button>
      </form>
      <div v-if="products.length && !isLoading && query" class="search__popup__wrapper">
         <h2 class="search-result-title">Sản phẩm được gợi ý</h2>
         <ul>
            <li v-for="item in products">
               <RouterLink :to="`/${item.category}/${item.href}`" class="product-item">
                  <div class="product-img">
                     <img :src="item.image" alt="" />
                  </div>
                  <div class="product-info">
                     <h2 class="title">{{ item.name }}</h2>
                     <div v-if="item.old_price" class="item__old_price">
                        <span class="old_price">{{ $filter.moneyFormat(item.old_price) }}</span>
                        <span class="discount-percent">
                           -
                           {{
                              (
                                 ((+item.old_price - +item.cur_price) / +item.old_price) *
                                 100
                              ).toFixed(0)
                           }}
                           %
                        </span>
                     </div>

                     <p class="cur_price">{{ $filter.moneyFormat(item.cur_price) }}</p>
                  </div>
               </RouterLink>
            </li>
         </ul>
      </div>
   </div>
</template>

<style scoped lang="scss">
@import "./Search.module.scss";
</style>
