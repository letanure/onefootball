<template lang="pug">
  .CategoriesForm.box
    form(v-on:submit.prevent='submit',)

      form-field(v-model.trim='category.name',
        type='text',
        label='Name',
        placeholder='Short descritive name',
        :validations='$v.category.name')

      template(v-if='categories[0]')
        select-category(v-model='category.parentCategory',
          label='Parent category',
          placeholder='Select the parent category',
          :validations='$v.category.parentCategory', )

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
import FormField from '@/components/core/FormField'

const categoriessRef = db.ref('categories')

export default {
  name: 'CategoriesForm',
  components: {
    FormField,
    SelectCategory,
  },
  props: {
    categorySlug: {
      default: '',
      type: String,
    },
  },
  data () {
    return {
      category: {
        name: null,
        parentCategory: null,
        slug: null,
      },
    }
  },
  validations: {
    category: {
      name: {
        required,
        minLength: minLength(4),
      },
      parentCategory: {},
    },
  },
  firebase: {
    categories: categoriessRef,
  },
  watch: {
    'category.name': {
      handler (val) {
        this.category.slug = slugify(this.category.name)
      },
      deep: true,
    },

    categorySlug () {
      this.searchCategory()
    },
  },
  mounted () {
    categoriessRef.once('value', snapshot => {
      if (this.categorySlug) {
        this.searchCategory()
      }
      // this.loading = false
    })
  },
  methods: {
    add () {
      let categoryCopy = {...this.category}
      delete categoryCopy['.key']
      categoriessRef.push(categoryCopy)
      this.clean()
      this.$router.push({name: 'CategoriesList'})
      toastr.success(`Category ${this.category.name} added with success.`)
    },

    clean () {
      this.category.name = ''
      this.category.parentCategory = ''
    },

    isDuplicated () {
      return this.categories.filter((category) => {
        return (category.slug === this.category.slug)
      }).length > 0
    },

    searchCategory () {
      const categoryEdit = this.categories.filter((category) => {
        return category.slug === this.categorySlug
      })[0]
      if (categoryEdit) {
        this.category = categoryEdit
      }
    },

    submit () {
      const isDuplicated = this.isDuplicated()
      const isEdit = this.category.hasOwnProperty('.key')
      const isValid = !this.$v.$invalid

      if (isValid) {
        if (!isEdit) {
          if (isDuplicated) {
            toastr.error(`Can't add the category ${this.category.name} this category name or slug already exists.`)
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
      let categoryCopy = {...this.category}
      delete categoryCopy['.key']
      this.$firebaseRefs.categories.child(this.category['.key']).set(categoryCopy)
      toastr.success(`Category ${this.category.name} updated with success.`)
      this.$router.push({name: 'CategoriesList'})
    },
  },
}
</script>

<style lang="stylus" scoped>
// .CategoriesForm
</style>
