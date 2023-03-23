<script>
	export default {
		name: "Button",
		props: {
		    primary: Boolean,
		    outline: Boolean,
		    rounded: Boolean,
		    fill: Boolean,
			count: Number,
			describe: String
		  }
	}
</script>
<template>

	<button :class="{primary: true, outline, rounded, fill}">
		<slot/> {{ count }} {{ describe }}
	</button>

</template>

<style lang="scss">
	@import './Button.module.scss'
</style>