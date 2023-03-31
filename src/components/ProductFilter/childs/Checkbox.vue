<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useFiltersStore } from '../../../store/filterStore';
const props = defineProps({
   data: Array, //continents
   handleFilter: Function,
});
const filterStore = useFiltersStore();
const checkedList = ref('');

const { filters } = storeToRefs(filterStore);

watch(
   filterStore,
   () => {
      checkedList.value = filters.value.brand;
   },
   {immediate: true}
);

const handleToggle = (value) => {
   let newChecked = [...checkedList.value];

   // nếu chọn tất cả
   if (!value && JSON.stringify(newChecked) === '[]') return;
   if (!value) newChecked = '';
   else {
      const index = newChecked.indexOf(value);

      if (index === -1) {
         // kiem tra xem co phai array khong
         Array.isArray(newChecked)
            ? newChecked.push(value)
            : (newChecked = [value]);
      } else newChecked.splice(index, 1);
   }

   // if empty
   if (JSON.stringify(newChecked) === '[]') newChecked = '';

   checkedList.value = newChecked;
   props.handleFilter(newChecked, 'brand');
};
</script>

<template>
   <div class="filter-item" v-for="item in data">
      <input
         :id="item.text"
         type="checkbox"
         :checked="checkedList.indexOf(item.href) !== -1 ? true : false"
         @change="(e) => handleToggle(item.href)"
      />
      <label :for="item.text" class="label">{{ item.text }}</label>
   </div>
</template>

<style scoped>
input {
   scale: 1.2;
}
.label {
   font-size: 1.6rem;
   padding-left: 5px;
}
</style>
