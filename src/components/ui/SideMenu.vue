<template lang="pug">
  nav.SideMenu.menu.animated.slideInLeft

    p.menu-label.
      General
    ul.menu-list
      li
        router-link(:to='{ name: "HomeDashboard"}', )
          span.icon.is-small
            i.fa.fa-tachometer
          |  Dashboard

    p.menu-label.
      Influencers

    ul.menu-list
      li
        router-link(:to='{ name: "InfluencersList"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            List Influencers
      li
        router-link(:to='{ name: "InfluencersForm"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            Add Influencer

    p.menu-label.
      Categories
    ul.menu-list
      li
        router-link(:to='{ name: "CategoriesList"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            List Categories
      li
        router-link(:to='{ name: "CategoriesForm"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            Add Categorie

    p.menu-label.
      Users
    ul.menu-list
      li
        router-link(:to='{ name: "UsersList"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            List Users
      li
        router-link(:to='{ name: "UsersAdd"}', )
          //- span.icon.is-small
            i.fa.fa-tachometer
          span.
            Add User
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>

<style lang="stylus">
.SideMenu
  background-color #fff
</style>
