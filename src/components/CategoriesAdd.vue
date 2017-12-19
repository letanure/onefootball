<template lang="pug">
  .CategoriesAdd.box
    form(v-on:submit.prevent='submit',)

      .field
        label.label.
          Name
        .control
          input.input(type='text',
            v-model.trim='category.name',
            :class='{ "is-danger": ($v.category.name.$dirty && $v.category.name.$invalid), "is-success": ($v.category.name.$dirty &&!$v.category.name.$invalid) }',
            @input="$v.category.name.$touch()",
            placeholder='Short descritive name', )
          p.help.is-danger(v-if='$v.category.name.$error && !$v.category.name.required')
            | Field is required
          p.help.is-danger(v-if="!$v.category.name.minLength")
            | Name must have at least {{$v.category.name.$params.minLength.min}} letters.

      template(v-if='categories[0]')
        .field
          label.label.
            Parent category
          .control
            .select
              select-category(placeholder='Select the parent category', v-model='category.parentCategory')

      .field
        .control
          button.button.is-info(type='submit').
            Save
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import toastr from 'toastr'
import db from '@/db'
import SelectCategory from '@/components/core/SelectCategory'

const categoriessRef = db.ref('categories')

export default {
  name: 'CategoriesAdd',
  components: {
    SelectCategory,
  },
  props: {
    categoryKey: {
      default: '',
      type: String,
    },
  },
  data () {
    return {
      category: {
        '.key': null,
        name: null,
        parentCategory: null,
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
    categoryKey () {
      this.searchCategory()
    },
  },
  mounted () {
    if (this.categoryKey) {
      this.searchCategory()
    }
  },
  methods: {
    searchCategory () {
      const categoryEdit = this.categories.filter((category) => {
        return category['.key'] === this.categoryKey
      })[0]
      if (categoryEdit) {
        this.category = {
          '.key': categoryEdit['.key'],
          name: categoryEdit.name,
          parentCategory: categoryEdit.parentCategory,
        }
      }
    },

    add () {
      let categoryCopy = {...this.category}
      delete categoryCopy['.key']
      categoriessRef.push(categoryCopy)
      this.clean()
      this.$router.push({name: 'CategoriesList'})
      toastr.success(`Category ${this.category.name} added with success.`)
    },

    update () {
      let categoryCopy = {...this.category}
      delete categoryCopy['.key']
      this.$firebaseRefs.categories.child(this.category['.key']).set(categoryCopy)
      toastr.success(`Category ${this.category.name} updated with success.`)
      this.$router.push({name: 'CategoriesList'})
    },

    clean () {
      this.category.name = ''
      this.category.parentCategory = ''
    },

    isDuplicated () {
      return this.categories.filter((category) => {
        return (category.name === this.category.name)
      }).length > 0
    },

    submit () {
      const isDuplicated = this.isDuplicated()
      const hasKey = this.category['.key']

      if (isDuplicated) {
        toastr.error(`Can't add the category ${this.category.name} this category name already exists.`)
      }

      if (!this.$v.$invalid && !isDuplicated && hasKey) {
        this.update()
      }

      if (!this.$v.$invalid && !isDuplicated && !hasKey) {
        this.add()
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
// .CategoriesAdd
</style>
