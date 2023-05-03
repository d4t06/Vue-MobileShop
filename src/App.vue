
<script setup>
import Header from './layout/Header/Header.vue';

</script>

<template>
    <Header/>
    <div class="container">
        <RouterView />
    </div>
</template>
<style>
html {
  scroll-behavior: smooth;
}
</style>