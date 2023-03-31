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
			disable: Boolean
		  }
	}
</script>
<template>

	<button :class="{primary: true, outline, rounded, fill, full, disable}">
		<slot/> {{ count }} {{ describe }}
	</button>

</template>

<style lang="scss">
	@import './Button.module.scss'
</style>