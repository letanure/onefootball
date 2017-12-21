<template lang="pug">
  nav.HeaderMain.navbar.is-fixed-top.has-shadow(role='navigation', aria-label='main navigation', )
    .navbar-brand
      a.navbar-item(href='/', )
        .logo
          | Instagram Influencers
      button.button.navbar-burger
        span
        span
        span
    .navbar-menu
      .navbar-start
        //- a.navbar-item
          | Home
      .navbar-end
        .navbar-item
          .control
            a.button.is-danger.is-outlined(@click='signOut', v-if='user', )
              span.
                Logout
              icon-ui(type='sign-out')

</template>

<script>
import Firebase from 'firebase'
import IconUi from '@/components/core/IconUi'

export default {
  name: 'HeaderMain',
  components: {
    IconUi,
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
  },
  methods: {
    signOut () {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace('sign-in')
        })
    },
  },
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
