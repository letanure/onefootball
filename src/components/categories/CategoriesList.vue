<template lang="pug">
  .CategoriesList

    .columns
      .column
        router-link.button.is-info.is-outlined(:to='{ name: "CategoriesForm"}', )
          icon-ui(type='plus')
          span.
            Add Category

    router-view

    .box

      template(v-if='categories[0]')

        table.table.is-striped.is-hoverable.is-fullwidth()
          thead
            tr
              th.
                Name
              th.
                Parent category
              th.
                Actions
          tbody
            tr(v-for='category in categories', )
              td.
                {{ category.name }}
              td.
                {{ parentCategoryName(category.parentCategory) }}
              td
                router-link.button.is-info.is-small.is-outlined(:to='{ name: "CategoriesEdit", params: { categorySlug: category.slug }}', )
                  icon-ui(type='pencil')
                  span.
                    Edit
                button.button.is-danger.is-small.is-outlined(v-on:click='confirmRemove(category)',)
                  icon-ui(type='trash')
                  span.
                    Delete

      template(v-else)

        h5.title.is-4
          span.
            No Categories yet.
        router-link.button.is-info(:to='{ name: "CategoriesForm" }', ).
          Add your first Category

    confirm-modal(@close='checkAnswer($event)',
      :active='activeModal',
      answer-no='No, keep the category',
      answer-yes='Yes, delete category',
      message='Deleting a category will remove it from your list.',
      title='Delete Category?',
    )
</template>

<script>
import toastr from 'toastr'
import IconUi from '@/components/core/IconUi'
import ConfirmModal from '@/components/core/ConfirmModal'
import db from '@/db'

const categoriessRef = db.ref('categories')

export default {
  name: 'CategoriesList',
  components: {
    ConfirmModal,
    IconUi,
  },
  data () {
    return {
      activeModal: false,
      deletingCategory: null,
    }
  },

  computed: {
  },

  firebase: {
    categories: categoriessRef,
  },

  methods: {
    checkAnswer (answer) {
      this.activeModal = false
      if (answer === 'yes') {
        this.remove(this.deletingCategory)
      }
    },

    confirmRemove (category) {
      this.deletingCategory = category
      this.activeModal = true
    },

    hasChildren (categorySlug) {
      return this.categories.filter((category) => {
        return (category.parentCategory === categorySlug)
      }).length > 0
    },

    parentCategoryName (parentCategoryKey) {
      const categoryFound = this.categories.find((category) => {
        return category.slug === parentCategoryKey
      })
      return (categoryFound ? categoryFound.name : '-')
    },

    remove (category) {
      const hasChildren = this.hasChildren(category.slug)
      if (hasChildren) {
        toastr.error(`Can't delete the category ${category.name} because is a parent category.`)
      }
      if (!hasChildren) {
        categoriessRef.child(category['.key']).remove()
        toastr.success(`Category ${category.name} removed successfully`)
      }
    },
  },
}
</script>

<style lang="stylus">
.CategoriesList

  .button
    margin-right 5px

    &:last-children
      margin-right 0
</style>
