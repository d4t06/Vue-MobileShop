<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Array,
});

const checkedList = ref(['']);

const handleToggle = (href) => {
  console.log(href);
};
</script>

<template>
  <div class="filter-item" v-for="item in data">
    <input :id="item.text" type="checkbox"
    @change="() => handleToggle(item.href)" 
    :checked="checkedList.indexOf(item.href) != -1 ? true : false"
    />
    <label :for="item.text" class="label">{{ item.text }}</label>
  </div>
</template>

<style scoped>
.label {
  font-size: 1.6rem;
  padding-left: 5px;
}
</style>
