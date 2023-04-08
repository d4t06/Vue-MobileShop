<template>
   <h2>Bộ lọc:</h2>
   <div
   v-if="props.data.brand"
   v-for="item, index in props.data.brand"
   @click="() => handleToggle(index)" class="filter-item" >
      <p>
         {{ item }}
      </p>
      <i class="material-icons">close</i>
   </div>

   <span v-if="props.data.price" @click="() => handleFilter('', 'price')" class="filter-item">
      {{ props.data.price  }}
      <i class="material-icons">close</i>
   </span>

   <button 
   v-if="props.data.brand.length > 1 ||
            (props.data.brand.length > 0 && props.data.price)"
   class="clear-filter" @click="() => handleFilter('', 'clear')">
      <span>
         <i class="material-icons">delete</i>
      </span>
   </button>
</template>

<script setup>

const props = defineProps({
   data: Object,
   handleFilter: Function,
   category: String
})

   const handleToggle = (index) => {
   let newChecked = [...props.data.brand];
      newChecked.splice(index, 1);
   if (JSON.stringify(newChecked) === '[]') newChecked = '';

   props.handleFilter(newChecked, 'brand');
};

</script>

<style scoped lang="scss">
@import "./QuickFilter.module.scss";
</style>
