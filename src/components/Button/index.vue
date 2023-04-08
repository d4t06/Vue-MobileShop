<script>
export default {
   name: "Button",
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
   },
};
</script>
<template>
	 <RouterLink v-if="to" :to="to"
   :class="['primary', { center, disable}]">
      <slot />
   </RouterLink>
   <button
      :class="['primary', { primary: true, outline, rounded, fill, full, disable }]"
      @click="onClick ? onClick() : ''"
   >
      <slot /> {{ count }} {{ describe }}
   </button>
</template>

<style lang="scss">
@import "./Button.module.scss";
</style>
