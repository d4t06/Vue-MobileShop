<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useFiltersStore } from '../../../store/filterStore';

const props = defineProps({
   data: Array,
   handleFilter: Function,
});
const filterStore = useFiltersStore()
const {filters} = storeToRefs(filterStore)
const checked = ref('');

watch(
   filterStore,
   () => {
      checked.value = filters.value.price;
   },
   { immediate: true }
);

const handleToggle = (array) => {
   checked.value = array;

   props.handleFilter(checked.value, 'price');
};
</script>

<template>
   <div v-for="item in data" class="filter-item">
      <input
         type="radio"
         :id="item.text + item.id"
         :checked="
            JSON.stringify(checked) === JSON.stringify(item.array) ? true : false
         "
         @change="() => handleToggle(item.array)"
      />
      <label class="label" :for="item.text + item.id">{{ item.text }}</label>
   </div>
</template>

<style scoped>
.label {
   font-size: 1.6rem;
   padding-left: 5px;
}
</style>
