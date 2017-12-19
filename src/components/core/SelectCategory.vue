<template lang="pug">
  select.SelectCategory(@input='updateValue($event.target.value)')
    option(value='').
      {{ placeholder }}
    option(v-for='category in categories', :value='category[".key"]' ).
      {{ category.name }}
</template>

<script>
import db from '@/db'

const categoriessRef = db.ref('categories')

export default {
  name: 'SelectCategory',
  props: {
    value: {
      default: '',
      type: String,
    },
    placeholder: {
      default: 'Select the category',
      type: String,
      required: true,
    },
  },
  data () {
    return {
    }
  },
  firebase: {
    categories: categoriessRef,
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="stylus">
// .SelectCategory
</style>
