<template lang="pug">
  .InfluencersAdd
    .box
      form#form.form-inline(v-on:submit.prevent='addInfluencer', )

        .field
          label.label.
            Name
          .control
            input.input(type='text', v-model='influencer.name', placeholder='', required, )

        .field
          label.label.
            Influencer's official Instagram username
          .control
            input.input(type='text', v-model='influencer.instagram', placeholder='@', required, )

        .field
          label.label.
            Country (optional)
          .control
            .select
              select-country(placeholder='Select the second category', v-model='influencer.category2')

        .field
          label.label.
            Main category
          .control
            .select
              select-category(placeholder='Select the main category', v-model='influencer.category1')

        .field
          label.label.
            Second category (optional)
          .control
            .select
              select-category(placeholder='Select the second category', v-model='influencer.category2')

        .field
          label.label.
            Influencer's official Facebook Fan Page (optional)
          .control
            input.input(type='url', v-model='influencer.facebook', placeholder='', )

        .field
          label.label.
            Influencer's official Twitter handle (optional)
          .control
            input.input(type='text', v-model='influencer.twitter', placeholder='@', )

        .control
          button.button.is-primary().
            Submit
</template>

<script>
import db from '@/db'
import SelectCategory from '@/components/core/SelectCategory'
import SelectCountry from '@/components/core/SelectCountry'

const booksRef = db.ref('books')
const influencersRef = db.ref('influencers')
const categoriessRef = db.ref('categories')

export default {
  name: 'InfluencersAdd',
  components: {
    SelectCategory,
    SelectCountry,
  },
  data () {
    return {
      influencer: {
        name: '',
        instagram: '',
        country: '',
        category1: '',
        category2: '',
        facebook: '',
        twitter: '',
      },
      newBook: {
        title: '',
        author: '',
        url: 'http://',
      },
    }
  },
  firebase: {
    books: db.ref('books'),
    influencers: db.ref('influencers'),
    categories: categoriessRef,
  },
  methods: {
    addBook: function () {
      booksRef.push(this.newBook)
      this.newBook.title = ''
      this.newBook.author = ''
      this.newBook.url = 'http://'
    },
    addInfluencer: function () {
      influencersRef.push(this.influencer)
    },
  },
}
</script>

<style lang="stylus">
// .InfluencersAdd
</style>
