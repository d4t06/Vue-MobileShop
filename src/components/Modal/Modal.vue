<script setup>
</script>
<template>
<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__body">
        <slot />
    </div>
</div>
</template>
<style scoped lang="scss">
@import "./Modal.module.scss"
</style>