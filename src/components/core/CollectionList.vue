<template lang="pug">
  .CollectionList

    .columns
      .column
        router-link.button.is-info.is-outlined(:to='{ name: routeNameAdd }', )
          icon-ui(type='plus')
          span.
            Add {{ labelSingular }}

    router-view

    .box

      template(v-if='collection[0]')

        table.table.is-striped.is-hoverable.is-fullwidth()

          thead
            tr
              template(v-for='collectionTableItem in collectionTable')
                th
                  | {{ collectionTableItem.header }}

          tbody
            tr(v-for='collectionItem in collection', )
              template(v-for='collectionTableItem in collectionTable')
                td(v-if='collectionTableItem.key', ).
                  {{ collectionItem[collectionTableItem.key] }}
                td(v-else)
                  router-link.button.is-info.is-small.is-outlined(:to='{ name: routeNameEdit, params: { itemSlug: collectionItem.slug }}', )
                    icon-ui(type='pencil')
                    span.
                      Edit
                  button.button.is-danger.is-small.is-outlined(v-on:click='confirmRemove(collectionItem)',)
                    icon-ui(type='trash')
                    span.
                      Delete

      template(v-else)

        h5.title.is-4
          span.
            No {{ labelPlural }} yet.
        router-link.button.is-info(:to='{ name: routeNameAdd  }', ).
          Add your first {{ labelSingular }}

    confirm-modal(@close='checkAnswer($event)',
      :active='activeModal',
      :answer-no='confirmAnswerNo',
      :answer-yes='confirmAnswerYes',
      :message='confirmMessage',
      :title='confirmTitle',
    )
</template>

<script>
import toastr from 'toastr'
import IconUi from '@/components/core/IconUi'
import ConfirmModal from '@/components/core/ConfirmModal'

export default {
  name: 'CollectionList',
  components: {
    ConfirmModal,
    IconUi,
  },
  props: {
  },
  data () {
    return {
      activeModal: false,
      collection: [],
      collectionRef: null,
      collectionTableItem: [],
      deletingItem: null,
      labelPlural: 'Collections',
      labelSingular: 'Item',
      routeNameAdd: 'home',
    }
  },
  computed: {
    confirmAnswerNo () {
      return `No, keep the ${this.labelSingular}`
    },
    confirmAnswerYes () {
      return `Yes, delete ${this.labelSingular}`
    },
    confirmMessage () {
      return `Deleting a ${this.labelSingular} will remove it from your list.`
    },
    confirmTitle () {
      return `Delete ${this.labelSingular}?`
    },
  },

  methods: {
    checkAnswer (answer) {
      this.activeModal = false
      if (answer === 'yes') {
        this.remove(this.deletingItem)
      }
    },

    confirmRemove (collectionItem) {
      this.deletingItem = collectionItem
      this.activeModal = true
    },

    remove (collectionItem) {
      this.collectionRef.child(collectionItem['.key']).remove()
      toastr.success(`${this.labelSingular} ${collectionItem.name} removed successfully`)
    },
  },
}
</script>

<style lang="stylus">
.CollectionList

  .button
    margin-right 5px

    &:last-children
      margin-right 0
</style>
