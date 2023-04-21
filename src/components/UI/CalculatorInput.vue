<template>
	<input @input="input($event)" class="calculator-input" />
</template>

<script>
export default {
	name: 'calculator-input',

	methods: {
		input(event) {
			this.$emit('update:value', event.target.value)
		},
	},
}
</script>

<style lang="scss"></style>
