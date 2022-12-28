<template>
  <label style="font-size: 17px;">
    <input :value="item._id" @change="selectItem($event)" type="checkbox" class="calculator-checkbox" ref="checkbox">
    {{ item.title }}
  </label>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    value: {
      type: String
    },
    orderIndex: {
      type: Number
    }
  },
  name: 'calculator-checkbox',
  data() {
    return {}
  },
  methods: {
    selectItem(event) {
      this.$emit('selectItem',
          (this.$refs.checkbox.checked ? event.target.value : '')
      )
    }
  },
}
</script>