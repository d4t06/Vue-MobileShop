<script setup>
import {ref} from 'vue'

const props = defineProps({
    data: Array,
})

const checked = ref('');
// item string === item string => true
const handleToggle = (array) => {

    console.log(JSON.stringify(array))

}
</script>

<template>

    <div v-for="item in data" class='filter-item'>
            <input
            type="radio"
            :id="item.text"
            :checked="JSON.stringify(checked) === JSON.stringify(item.array) ? true : false"
            @change="() => handleToggle(item.array)"
            />
            <label class='label' :for="item.text">{{ item.text }}</label>
    </div>
   
</template>

<style scoped>
.label {
  font-size: 1.6rem;
  padding-left: 5px;
}
</style>