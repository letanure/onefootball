<template lang="pug">
  span.IconUi.icon
    i.fa(:class='iconClass')
</template>

<script>
export default {
  name: 'IconUi',
  props: {
    type: {
      default: '',
      type: String,
      required: true,
    },
  },
  computed: {
    iconClass () {
      return [`fa-${this.type}`]
    },
  },
}
</script>

<style lang="stylus">
// .IconUi
</style>
