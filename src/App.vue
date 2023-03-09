
<script setup>
// import Todo from './components/Todo.vue'
// import Button from './components/Button/index.vue'
// import {ref, onMounted, onUnmounted, watch } from 'vue'
import Header from './components/Header/Header.vue'

// const isShow = ref(false)
// const total = ref(1000000)
// const text = ref('show')

// const handleShow = () => {
//     isShow.value = !isShow.value
//     text.value = isShow.value ? 'hide' : 'show'
// }

// onMounted(() => {
//         console.log("mounted")
//     })
// onUnmounted(() => {
//     console.log("unmounted")
// })

</script>

<template>
    <!--
    <h1>{{$filters.moneyFormat(total)}}</h1>
    <Button @click="handleShow()" primary outline rounded>{{text}}</Button>
    <br>
    <Todo v-if="isShow" /> -->
    <Header/>
    <RouterView />
</template>

<style scoped>
</style>