<script setup>
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import * as productServices from '../../services/productServices'

const searchRef = ref("");
const isLoading = ref(false);

const saveSearchChange = debounce( async() => {
   isLoading.value = true;
   const response = await productServices.search({q: searchRef.value});
   if (response) {
      console.log(response.data)
   }
   setTimeout(() => {
      isLoading.value = false;
   }, 1000);
}, 900);

watch(searchRef, saveSearchChange);
</script>
<template>
   <div className="wrap">
      <form className="form">
         <input
            className="input"
            type="text"
            placeholder="Hôm nay bạn muốn tìm gì..."
            v-model="searchRef"
         />
         <button
            v-if="searchRef && !isLoading"
            class="clear-btn"
            @click="() => handleClear()"
         >
            <i class="material-icons">cancel</i>
         </button>
         <button v-if="isLoading" class="loading-btn">
            <i class="material-icons">sync</i>
         </button>
         <button className="search-btn">
            <span class="material-icons">search</span>
         </button>
      </form>
   </div>
</template>

<style lang="scss">
@import "./Search.module.scss";
</style>
