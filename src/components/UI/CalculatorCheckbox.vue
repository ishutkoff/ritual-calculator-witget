<template>
	<label style="font-size: 17px">
		<input :checked="this.inOrder(this.item._id)" :value="item._id" @change="selectItem($event)" type="checkbox"
			class="calculator-checkbox main-color" ref="checkbox" />
		{{ item.title }}
	</label>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: {
		item: {
			type: Object,
		},
		value: {
			type: String,
		},
	},
	name: 'calculator-checkbox',
	data() {
		return {}
	},
	computed: {
		...mapGetters(['inOrder']),
	},
	methods: {
		selectItem(event) {
			this.$emit(
				'selectItem',
				this.$refs.checkbox.checked ? event.target.value : ''
			)
		},
	},
}
</script>
