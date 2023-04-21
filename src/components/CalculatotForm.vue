<template>
	<p v-if="getOrderList.length === 0 && !$store.state.successSend" class="calculator-form__list-empty">
		Выберите услуги и мы рассчитаем стоимость
	</p>
	<div class="success-message" v-if="$store.state.successSend">
		<div class="calculator-form__title">Ваша заявка отправлена.</div>
		<p>Наши менеджеры свяжутся с Вами в ближайшее время</p>
	</div>

	<div v-if="getOrderList.length !== 0" :class="getOrderList.length !== 0 ? 'calculator-form--no-empty' : ''"
		class="calculator-form__wrapper">
		<div class="calculator-form__items">
			<div class="calculator-form__title">
				Общая стоимость от: <span>{{ getSum }} ₽</span>
			</div>
			<div class="calculator-form__subtitle">Вы выбрали:</div>
			<div v-for="item of getOrderList" class="calculator-form__item">
				<div class="calculator-form__product">
					<div>{{ item.title }}</div>
					<div v-if="item.price > 0">
						{{ item.price.toLocaleString('ru') }} ₽
					</div>
					<div v-else>Бесплатно</div>
				</div>
				<div @click="removeFromOrder(item._id)" class="calculator-form__del-btn"></div>
			</div>
		</div>
		<div class="calculator-form">
			<p class="calculator-form__note">
				Расчет стоимости не является публичной офертой и может отличаться от
				окончательной, для уточнения стоимости оставьте свои контактные данные
			</p>

			<div class="calculator-form__input">
				<calculator-input v-model:value="name" placeholder="Имя" type="text" />
			</div>
			<div class="calculator-form__input">
				<calculator-input @model:value="phone" v-maska data-maska="+7 (###) ###-##-##" v-model:value="phone"
					placeholder="Ваш телефон*" type="tel" />
			</div>
			<p class="calculator-form__accept">
				Нажимая на кнопку, даю согласие на обработку Персональных данных
			</p>
			<calculator-button @click="sendShopCart" :disabled="phone.length < 18"
				:title="phone.length < 18 ? 'Не заполнены обязательные поля' : ''">Отправить</calculator-button>
		</div>
	</div>
</template>

<script>
import CalculatorButton from './UI/CalculatorButton.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CalculatorInput from './UI/CalculatorInput.vue'

export default {
	components: { CalculatorInput, CalculatorButton },

	data() {
		return {}
	},

	computed: {
		...mapGetters(['getOrderList', 'getSum']),
		phone: {
			get() {
				return this.$store.state.userData.phone
			},
			set(value) {
				this.$store.commit('updatePhone', value)
			},
		},
		name: {
			get() {
				return this.$store.state.userData.name
			},
			set(value) {
				this.$store.commit('updateName', value)
			},
		},
	},
	methods: {
		...mapActions(['sendShopCart']),
		...mapMutations(['removeFromOrder']),
	},
}
</script>

<style scoped></style>
