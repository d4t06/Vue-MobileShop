<script setup>
import {ref} from 'vue'

const props = defineProps({
    data: Array,
    handleFilter: Function,
})


const checked = ref('');
// empty string === empty string => true
const handleToggle = (array) => {
    checked.value = array

    props.handleFilter(checked.value, "price")
    // props.handleFilter(array, 'brand')

}
</script>

<template>

    <div v-for="item in data" class='filter-item'>
            <input
            type="radio"
            :id="item.text + item.id"
            :checked="JSON.stringify(checked) == JSON.stringify(item.array) ? true : false"
            @change="() => handleToggle(item.array)"
            />
            <label class='label' :for="item.text + item.id">{{ item.text }}</label>
    </div>
   
</template>

<style scoped>
.label {
  font-size: 1.6rem;
  padding-left: 5px;
}
</style>