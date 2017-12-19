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
import HeaderMain from '@/components/HeaderMain'
import PageTitle from '@/components/PageTitle'
import SideMenu from '@/components/SideMenu'

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
}
</script>

<style>
  #AppVue {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
