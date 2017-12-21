<template lang="pug">
  .InfluencersAdd.box

    form.form-inline(v-on:submit.prevent='submit',)

      form-field(v-model.trim='influencer.name',
        type='text',
        label='Name',
        placeholder='Short descritive name',
        :validations='$v.influencer.name', )

      form-field(v-model.trim='influencer.instagram',
        type='text',
        label='Influencers official Instagram username',
        placeholder='@',
        :validations='$v.influencer.instagram', )

      select-country(v-model='influencer.country',
        label='Country',
        placeholder='Select the country',
        :validations='$v.influencer.country', )

      template(v-if='categories[0]')
        select-category(v-model='influencer.category1',
          label='Main category',
          placeholder='Select the main category',
          :validations='$v.influencer.category1', )

      template(v-if='categories[0]')
        select-category(v-model='influencer.category2',
          label='Second category (optional)',
          placeholder='Select the second category',
          :validations='$v.influencer.category2', )

      form-field(v-model.trim='influencer.facebook',
        type='url',
        label='Influencers official Facebook Fan Page',
        placeholder='http://',
        :validations='$v.influencer.facebook', )

      form-field(v-model.trim='influencer.twitter',
        type='text',
        label='Influencers official Twitter handle',
        placeholder='@',
        :validations='$v.influencer.twitter', )

      .field
        .control
          button.button.is-info(type='submit').
            Save
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import slugify from 'slugify'
import toastr from 'toastr'
import db from '@/db'
import SelectCategory from '@/components/core/SelectCategory'
import SelectCountry from '@/components/core/SelectCountry'
import FormField from '@/components/core/FormField'

const influencersRef = db.ref('influencers')
const categoriessRef = db.ref('categories')

export default {
  name: 'InfluencersAdd',
  components: {
    FormField,
    SelectCategory,
    SelectCountry,
  },
  props: {
    categorySlug: {
      default: '',
      type: String,
    },
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
    }
  },
  validations: {
    influencer: {
      name: {
        required,
        minLength: minLength(4),
      },
      instagram: {
        required,
      },
      country: {
        required,
      },
      category1: {
        required,
      },
      category2: {
      },
      facebook: {
        minLength: minLength(4),
      },
      twitter: {
        minLength: minLength(4),
      },
    },
  },
  firebase: {
    categories: categoriessRef,
    influencers: db.ref('influencers'),
  },
  watch: {
    'category.name': {
      influencer (val) {
        this.influencer.slug = slugify(this.influencer.name)
      },
      deep: true,
    },

    categorySlug () {
      this.searchInfluencer()
    },
  },
  mounted () {
    influencersRef.once('value', snapshot => {
      if (this.categorySlug) {
        this.searchInfluencer()
      }
      // this.loading = false
    })
  },
  methods: {
    add () {
      let categoryCopy = {...this.influencer}
      delete categoryCopy['.key']
      influencersRef.push(categoryCopy)
      this.clean()
      this.$router.push({name: 'InfluencersList'})
      toastr.success(`Category ${this.influencer.name} added with success.`)
    },

    clean () {
      this.influencer.name = ''
      this.influencer.parentCategory = ''
    },

    isDuplicated () {
      return this.influencers.filter((instagram) => {
        return (instagram.instagram === this.influencer.instagram)
      }).length > 0
    },

    searchInfluencer () {
      const categoryEdit = this.categories.filter((category) => {
        return category.slug === this.influencerSlug
      })[0]
      if (categoryEdit) {
        this.influencer = categoryEdit
      }
    },

    submit () {
      const isDuplicated = this.isDuplicated()
      const isEdit = this.influencer.hasOwnProperty('.key')
      const isValid = !this.$v.$invalid

      if (isValid) {
        if (!isEdit) {
          if (isDuplicated) {
            toastr.error(`Can't add the influencer ${this.influencer.name}. this influencer account already exists.`)
          } else {
            this.add()
          }
        }
        if (isEdit) {
          this.update()
        }
      }
    },

    update () {
      let categoryCopy = {...this.influencer}
      delete categoryCopy['.key']
      this.$firebaseRefs.influencers.child(this.influencer['.key']).set(categoryCopy)
      toastr.success(`Category ${this.influencer.name} updated with success.`)
      this.$router.push({name: 'InfluencersList'})
    },
  },
}
</script>

<style lang="stylus">
// .InfluencersAdd
</style>
