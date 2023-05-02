<script>
export default {
   name: 'Button',
   props: {
      primary: Boolean,
      outline: Boolean,
      rounded: Boolean,
      fill: Boolean,
      full: Boolean,
      count: Number,
      describe: String,
      disable: Boolean,
      to: String,
      onClick: Function,
      hasIcon: Boolean,
      loading: Boolean,
   },
};
</script>
<template>
   <RouterLink v-if="to" :to="to" :class="['primary', { center, disable }]">
      <slot />
   </RouterLink>
   <button
      :class="[
         'primary',
         { outline, rounded, fill, full, disable: disable || loading, hasIcon },
      ]"
      @click="onClick ? onClick() : ''"
   >
      <i v-if="loading" class="material-icons loading">sync</i>
      <slot /> {{ count }} {{ describe }}
   </button>
</template>

<style lang="scss">
@import './Button.module.scss';
</style>
