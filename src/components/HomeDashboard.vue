<template lang="pug">
  .HomeDashboard.columns.is-multiline
    .column
      .box.notification.is-primary
        .heading Top Seller Total
        .title 56,950
        .level
          .level-item
            div
              .heading Sales $
              .title.is-5 250K
          .level-item
            div
              .heading Overall $
              .title.is-5 750K
          .level-item
            div
              .heading Sales %
              .title.is-5 25%
    .column
      .box.notification.is-warning
        .heading Revenue / Expenses
        .title 55% / 45%
        .level
          .level-item
            div
              .heading Rev Prod $
              .title.is-5 30%
          .level-item
            div
              .heading Rev Serv $
              .title.is-5 25%
          .level-item
            div
              .heading Exp %
              .title.is-5 45%
    .column
      .box.notification.is-info
        .heading Feedback Activity
        .title 78% ↑
        .level
          .level-item
            div
              .heading Pos
              .title.is-5 1560
          .level-item
            div
              .heading Neg
              .title.is-5 368
          .level-item
            div
              .heading Pos/Neg %
              .title.is-5 77% / 23%
    .column
      .box.notification.is-danger
        .heading Orders / Returns
        .title 75% / 25%
        .level
          .level-item
            div
              .heading Orders $
              .title.is-5 425K
          .level-item
            div
              .heading Returns $
              .title.is-5 106K
          .level-item
            div
              .heading Success %
              .title.is-5 + 28,5%

</template>

<script>

export default {
  name: 'HomeDashboard',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="stylus">
// .HomeDashboard
</style>
