
<script setup>
// import Todo from './components/Todo.vue'
// import Button from './components/Button/index.vue'
// import {ref, onMounted, onUnmounted, watch } from 'vue'
// import Header from './layout/Header/Header.vue'

import Header from './layout/Header/Header.vue';
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
    <Header/>
    <div class="container">
        <RouterView />
    </div>

</template>
