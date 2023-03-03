<script>
	export default {
		name: "Button",
		props: {
		    primary: Boolean,
		    outline: Boolean,
		    rounded: Boolean,
		    fill: Boolean,
		  }
	}
</script>
<template>

	<button :class="{primary, outline, rounded, fill}">
		<slot/>
	</button>

</template>

<style lang="scss">
	@import './Button.module.scss'
</style>