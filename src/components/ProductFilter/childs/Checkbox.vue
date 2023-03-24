<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Array,
  handleFilter: Function,
});

const checkedList = ref('');

const handleToggle = (value) => {
  // const newChecked = checkedList.value

  const index = checkedList.value.indexOf(value);
  // nếu chọn tất cả
  if (!value) checkedList.value = "";
  else {
    const index = checkedList.value.indexOf(value);

    if (index === -1) {
      // kiem tra xem co phai array khong
      Array.isArray(checkedList.value)
        ? checkedList.value.push(value)
        : (checkedList.value = [value]);
    } else checkedList.value.splice(index, 1);
  }

  // nếu không chọn gì cả
  if (JSON.stringify(checkedList.value) === "[]") checkedList.value = '';

  props.handleFilter(checkedList.value, "brand");
};
</script>

<template>
  <div class="filter-item" v-for="item in data">
    <input
      :id="item.text"
      type="checkbox"
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
