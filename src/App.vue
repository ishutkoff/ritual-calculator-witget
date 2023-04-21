<template>
	<div class="calculator">
		<div class="calculator__left">
			<calculator-tabs />
		</div>
		<div class="calculator__right main-color-border"
			:class="getOrderList.length === 0 ? 'calculator__right--empty' : ''">
			<calculator-form />
		</div>
	</div>
</template>

<script>
import CalculatorForm from './components/CalculatotForm.vue'
import CalculatorTabs from './components/CalculatorTabs.vue'
import { getAccentColor } from './helpers/getColors'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {

	data() {
		return {
			color: '',
		}
	},

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
	mounted() {
		this.color = getAccentColor()
	}
}
</script>
<style lang='scss'>
.main-color-bg {
	background-color: v-bind(color) !important
}

.main-color {
	color: v-bind(color) !important
}

.main-color-border {
	border-color: v-bind(color) !important
}
</style>