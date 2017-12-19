<template lang="pug">
  #app
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
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    pageTitle () {
      return this.$route.meta.title
    },
  },
  methods: {
  },
  components: {
    HeaderMain,
    PageTitle,
    SideMenu,
  },
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
