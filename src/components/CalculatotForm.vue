<template>
  <p v-if="getOrderList.length === 0" class="calculator-form__list-empty">Выберите услуги и мы расчитаем стоимость</p>
  <div v-if="getOrderList.length !== 0" :class="(getOrderList.length !== 0 ? 'calculator-form--no-empty' : '')"
       class="calculator-form__wrapper">
    <div class="calculator-form__items">
      <div class="calculator-form__title">
        Общая стоимость от: <span>{{ getSum }} ₽</span>
      </div>
      <div class="calculator-form__subtitle">Вы выбрали:</div>
      <div v-for="item of getOrderList" class="calculator-form__item">
        <div class="calculator-form__product">
          <div>{{ item.title }}</div>
          <div>{{ item.price.toLocaleString('ru') }} ₽</div>
        </div>
        <div @click="removeFromOrder(item._id)" class="calculator-form__del-btn"></div>
      </div>
    </div>
    <form class="calculator-form">
      <p class="calculator-form__note">
        Расчет стоимости не является публичной офертой и может отличаться от окончательной, для уточнения стоимости оставьте свои контактные данные
      </p>

      <div class="calculator-form__input">
        <calculator-input placeholder="Имя" type="text"/>
      </div>
      <div class="calculator-form__input">
        <calculator-input placeholder="Телефон" type="text"/>
      </div>
      <p class="calculator-form__accept">Нажимая на кнопку, даю согласие на
обработку Персональных данных</p>
      <calculator-button>Отправить</calculator-button>
    </form>
  </div>
</template>

<script>
import CalculatorButton from "./UI/CalculatorButton.vue";
import {mapGetters, mapMutations} from "vuex";
import CalculatorInput from "./UI/CalculatorInput.vue";

export default {
  components: {CalculatorInput, CalculatorButton},
  computed: {
    ...mapGetters(['getOrderList', 'getSum'])
  },
  methods: {
    ...mapMutations(['removeFromOrder']),
  }
}
</script>

<style scoped>

</style>