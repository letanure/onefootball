<template lang="pug">
  nav.HeaderMain
    .hero.is-light
      .hero-head
        .navbar.is-fixed-top.has-shadow(role='navigation', aria-label='main navigation')
          .navbar-brand
            a.navbar-item(href='/')
              .logo
                | Instagram Influencers
            button.button.navbar-burger
              span
              span
              span
          //- .navbar-menu
            .navbar-start
              a.navbar-item
                | Home
            .navbar-end
              //- a.navbar-item
                | Home

</template>

<script>
export default {
  name: 'HeaderMain',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.HeaderMain

  .logo
    text-transform uppercase
    font-weight bold
    position relative
    padding-left 10px

    &:before
      content ''
      display inline-block
      background-color #0085AD
      width 5px
      height 20px
      border-radius 8px
      position absolute
      top 0
      left 0px
</style>
