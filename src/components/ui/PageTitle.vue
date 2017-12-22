<template lang="pug">
  .PageTitle.level
    .level-left
      .level-item
        .title.
          {{ title }}
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Page title',
    },
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="stylus">
// .PageTitle
</style>
