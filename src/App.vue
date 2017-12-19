<template lang="pug">
  #AppVue
    header-main()
    .section
      .columns
        aside.column.is-2
          side-menu()
        main.column
          page-title(:title='pageTitle', )
          router-view
</template>

<script>
import {
  HeaderMain,
  PageTitle,
  SideMenu
} from '@/components/'

export default {
  name: 'AppVue',
  components: {
    HeaderMain,
    PageTitle,
    SideMenu,
  },
  computed: {
    pageTitle () {
      return this.$route.meta.title
    },
  },
  created () {
    this.setUser()
  },
  methods: {
    setUser () {
      this.$store.dispatch('setUser')
    },
  },
}
</script>

<style>
  #AppVue {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
