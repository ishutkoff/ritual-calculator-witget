<template>
    <select :value="value" @change="selectItem($event)" class="calculator-select">
      <option  value="" >{{ title }}</option>
      <option v-for="item of items" :value="item._id" :key="item._id" >{{ item.title }}</option>
    </select>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    title: {
      type: String
    },
    value: {
      type: String
    },
    orderIndex:{
      type: Number
    }
  },
  name: 'calculator-select',
  data() {
    return {
    }
  },
  methods: {
    selectItem(event) {
      this.$emit('selectItem', event.target.value)
    }
  },
}
</script>
