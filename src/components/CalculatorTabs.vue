<template>
	<div class="calculator-tabs">
		<div class="calculator-tabs-wrapper">
			<div @click="setType(BURIAL)" class="calculator-tabs-item" :class="
				$store.state.serviceType === BURIAL
					? 'calculator-tabs-item--selected main-color-bg'
					: ''
			">
				<svg width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M28.75 35H0v-3.43h28.75V35ZM26.77 0v30.75H2V0h24.77ZM11.8 8.51h1.86v6.66h1.37V8.5h1.85V7.07h-1.85v-2.6h-1.37v2.6H11.8V8.5Z"
						fill="#fff"></path>
				</svg>
				Захоронение
			</div>
			<div @click="setType(CREMATION)" class="calculator-tabs-item" :class="
				$store.state.serviceType === CREMATION
					? 'calculator-tabs-item--selected main-color-bg'
					: ''
			">
				<svg width="29" height="35" viewBox="0 0 22 35" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.8 2.23 10.76.06c.31-.08.78-.08 1.09 0l5.98 2.17c.3.08.3.16 0 .16H4.87c-.31.08-.31 0-.08-.16Zm17.08 10.72c0 4.35-4.04 20.1-4.04 20.1-.24 1.1-1.4 1.95-2.49 1.95h-8a2.73 2.73 0 0 1-2.48-1.94S.76 16.83.76 12.48c0-1.55.23-2.64.23-2.64A2.55 2.55 0 0 1 3.32 7.9h1.32l.62-3.5h-.54a.53.53 0 0 1-.55-.54v-.39c0-.3.23-.54.55-.54h13.04c.31 0 .54.23.54.54v.4c0 .3-.23.54-.54.54h-.54l.62 3.5h1.24c1.09 0 2.17.84 2.4 1.93 0-.15.4 1.4.4 3.1ZM14.1 14.5h-2.4v-3.88h-.78v3.88H8.52v.78h2.4v12.27h.78V15.28h2.41v-.78Z"
						fill="#fff"></path>
				</svg>
				Кремация
			</div>
		</div>
		<div class="calculator-body main-color-border">
			<div class="calculator-body-title">
				Ритуальные принадлежности для захоронения:
			</div>
			<div class="calculator-products-groups">
				<div v-for="productCategory of getProductsCategories" :key="productCategory._id"
					class="calculator-products-groups__item">
					<div class="calculator-products-groups__image" :class="
						$store.state.orderList[createIndex(productCategory._id)]
							? 'active'
							: ''
					">
						<img v-if="
							$store.state.orderList[createIndex(productCategory._id)] &&
							$store.state.orderList[createIndex(productCategory._id)].image
						" :src="`${baseUrl}/files/${$store.state.orderList[createIndex(productCategory._id)].image
	}`" />
						<svg v-if="
							$store.state.orderList[createIndex(productCategory._id)] &&
							!$store.state.orderList[createIndex(productCategory._id)].image
						" version="1.0" xmlns="http://www.w3.org/2000/svg" width="416.000000pt" height="416.000000pt"
							viewBox="0 0 416.000000 416.000000" preserveAspectRatio="xMidYMid meet">
							<g transform="translate(0.000000,416.000000) scale(0.100000,-0.100000)" fill="#cccccc"
								stroke="none">
								<path d="M280 2080 l0 -1800 1800 0 1800 0 0 1800 0 1800 -1800 0 -1800 0 0
			-1800z m3445 485 c0 -635 -2 -1155 -5 -1154 -3 0 -68 70 -145 154 -77 84 -145
			153 -151 152 -6 -1 -210 -217 -454 -480 -355 -383 -446 -475 -456 -465 -11 12
			-1150 1386 -1297 1566 -33 39 -61 72 -62 72 -1 0 -53 -62 -116 -138 -62 -75
			-223 -269 -356 -430 l-243 -293 0 1086 0 1085 1643 0 1642 0 0 -1155z" />
								<path d="M1952 3299 c-64 -25 -139 -96 -172 -164 -34 -69 -36 -207 -3 -277 30
			-66 96 -133 162 -165 47 -23 69 -27 141 -28 73 0 93 4 142 28 72 35 140 110
			168 185 29 76 24 186 -10 258 -34 69 -108 138 -175 163 -74 28 -180 27 -253 0z" />
							</g>
						</svg>
					</div>
					<div>
						<calculator-select :value="
							$store.state.orderList[createIndex(productCategory._id)]
								? $store.state.orderList[createIndex(productCategory._id)]._id
								: ''
						" :items="productCategory.products" :title="productCategory.title" @selectItem="
	_id =>
		this.changeSelect({
			_id: _id,
			type: PRODUCT,
			index: createIndex(productCategory._id),
		})
" />
						<div v-if="$store.state.orderList[createIndex(productCategory._id)]"
							class="calculator-products-groups__price-wrapper">
							<span class="calculator-products-groups__price">
								Цена:
								<span>{{
									$store.state.orderList[createIndex(productCategory._id)] &&
									$store.state.orderList[createIndex(productCategory._id)]
										.price
									? $store.state.orderList[
										createIndex(productCategory._id)
									].price.toLocaleString('ru')
									: ''
								}}
									₽</span></span>
							<span @click="
								removeFromOrder(
									$store.state.orderList[createIndex(productCategory._id)]._id
								)
							" class="calculator-products-groups__remove-btn">Отменить выбор</span>
						</div>
					</div>
				</div>
			</div>
			<div class="calculator-products-without-group">
				<div v-for="product of getProductsWithOutCategory" :key="product._id"
					class="calculator-products-without-group__item">
					<div class="calculator-products-without-group__image">
						<img v-if="product.image" :src="`${baseUrl}/files/${product.image}`" />
						<svg v-if="!product.image" version="1.0" xmlns="http://www.w3.org/2000/svg" width="416.000000pt"
							height="416.000000pt" viewBox="0 0 416.000000 416.000000" preserveAspectRatio="xMidYMid meet">
							<g transform="translate(0.000000,416.000000) scale(0.100000,-0.100000)" fill="#cccccc"
								stroke="none">
								<path d="M280 2080 l0 -1800 1800 0 1800 0 0 1800 0 1800 -1800 0 -1800 0 0
			         -1800z m3445 485 c0 -635 -2 -1155 -5 -1154 -3 0 -68 70 -145 154 -77 84 -145
			        153 -151 152 -6 -1 -210 -217 -454 -480 -355 -383 -446 -475 -456 -465 -11 12
			         -1150 1386 -1297 1566 -33 39 -61 72 -62 72 -1 0 -53 -62 -116 -138 -62 -75
			         -223 -269 -356 -430 l-243 -293 0 1086 0 1085 1643 0 1642 0 0 -1155z" />
								<path d="M1952 3299 c-64 -25 -139 -96 -172 -164 -34 -69 -36 -207 -3 -277 30
			         -66 96 -133 162 -165 47 -23 69 -27 141 -28 73 0 93 4 142 28 72 35 140 110
			        168 185 29 76 24 186 -10 258 -34 69 -108 138 -175 163 -74 28 -180 27 -253 0z" />
							</g>
						</svg>
					</div>
					<div>
						<calculator-checkbox :item="product" @selectItem="
							_id =>
								this.changeSelect({
									_id: _id,
									type: PRODUCT,
									index: createIndex(product._id),
								})
						" />
						<div class="calculator-products-without-group__price-wrapper">
							<span class="calculator-products-without-group__price">
								Цена:
								<span>{{ product.price.toLocaleString('ru') }} ₽</span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="
			getServicesCategories.length > 0 ||
			getServicesWithOutCategory.length > 0
		" class="calculator-body main-color-border">
			<div class="calculator-body-title">Услуги ритуальной службы:</div>
			<div class="calculator-services-group">
				<div v-for="serviceCategory of getServicesCategories" :key="serviceCategory._id"
					class="calculator-services-without-group__item">
					<calculator-select :items="serviceCategory.services" :title="serviceCategory.title" @selectItem="
						_id =>
							this.changeSelect({
								_id: _id,
								type: SERVICE,
								index: createIndex(serviceCategory._id),
							})
					" />
				</div>
			</div>
			<div class="calculator-services-without-group">
				<div v-for="service of getServicesWithOutCategory" :key="service._id"
					class="calculator-services-without-group__item">
					<div>
						<calculator-checkbox :item="service" @selectItem="
							_id =>
								this.changeSelect({
									_id: _id,
									type: SERVICE,
									index: createIndex(service._id),
								})
						" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { CREMATION, BURIAL, PRODUCT, SERVICE } from '../common/constants.js'
import CalculatorInput from './UI/CalculatorInput.vue'
import CalculatorCheckbox from './UI/CalculatorCheckbox.vue'

export default {
	components: { CalculatorCheckbox, CalculatorInput },

	data() {
		return {
			orderIndexes: [],
		}
	},
	methods: {
		...mapMutations(['setType', 'pushToOrderList', 'removeFromOrder']),
		changeSelect(data) {
			this.pushToOrderList(data)
			this.orderIndex++
		},
		createIndex(id) {
			let index = this.orderIndexes.indexOf(id)
			if (index === -1) {
				this.orderIndexes.push(id)
				index = this.orderIndexes.indexOf(id)
			}
			return index
		},
	},
	computed: {
		...mapGetters([
			'getProductsCategories',
			'getServicesCategories',
			'getProductsWithOutCategory',
			'getServicesWithOutCategory',
		]),
	},
	mounted() {
		this.CREMATION = CREMATION
		this.BURIAL = BURIAL
		this.PRODUCT = PRODUCT
		this.SERVICE = SERVICE
		this.baseUrl = import.meta.env.VITE_URL
	},
}
</script>

<style scoped></style>
