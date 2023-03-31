<template>
   <h2>Bộ lọc:</h2>
   <div v-if="props.data?.brand" @click="() => handleToggle(item)" class="filter-item" key="{index}">
      <p>
         {{ item }}
      </p>
      <i class="material-icons">delete</i>
   </div>

   <span v-if="props.data.price" @click="() => handleFilter('', 'price')" class="filter-item">
      {{ props.data.price || "" }}
      <i class="material-icons">delete</i>
   </span>

   <button 
   v-if="props.data?.brand?.length > 1 ||
            (props.data?.brand?.length > 0 && props.data.price)"
   class="clear-filter" @click="() => handleFilter('', 'clear')">
      <span>
         <i class="material-icons">delete_forever</i>
      </span>
   </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
   data: Object,
   handleFilter: Function,
   category: String
})
</script>

<style scoped lang="scss">
@import "./QuickFilter.module.scss";
</style>
