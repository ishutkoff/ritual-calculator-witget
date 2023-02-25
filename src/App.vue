<template>
	<div class="calculator">
		<div class="calculator__left">
			<calculator-tabs />
		</div>
		<div
			class="calculator__right"
			:class="getOrderList.length === 0 ? 'calculator__right--empty' : ''"
		>
			<calculator-form />
		</div>
	</div>
</template>

<script>
import CalculatorForm from './components/CalculatotForm.vue'
import CalculatorTabs from './components/CalculatorTabs.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
	components: {
		CalculatorForm,
		CalculatorTabs,
	},
	computed: {
		...mapGetters(['getOrderList']),
	},
	methods: {
		...mapMutations(['setShopId']),
		...mapActions(['fetchShopData', 'fetchAllCategories']),
	},
	async created() {
		await this.setShopId(localStorage.shopId)
		await this.fetchShopData()
		await this.fetchAllCategories()
	},
}
</script>
