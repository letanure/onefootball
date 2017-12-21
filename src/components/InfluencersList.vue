<template lang="pug">
  .InfluencersList

    .columns
      .column
        router-link.button.is-info.is-outlined(:to='{ name: "InfluencersAdd"}', )
          icon-ui(type='plus')
          span.
            Add Influencer

    router-view

    .box

      template(v-if='influencers[0]')

        table.table.is-striped.is-hoverable.is-fullwidth()
          thead
            tr
              th.
                Influencer
              th.
                Country
              th.
                Categories
              //- th
                abbr(title='Average engagement rate of all media. Engagement rate is based on the likes and comments received divided by the number of followers at the time of the post.').
                  ER
              //- th.
                Media posted
              th.
                Actions
          tbody
            tr(v-for='influencer in influencers', )
              td.
                {{ influencer.instagram }}
              td.
                {{ countryName(influencer.country) }}
              td
                .tag.
                  {{ influencer.category1 }}
              //- td.
                0
              //- td.
                0
              td
                router-link.button.is-info.is-small.is-outlined(:to='{ name: "InfluencersEdit", params: { influencerSlug: influencer.instagram }}', )
                  icon-ui(type='pencil')
                  span.
                    Edit
                .button.is-danger.is-small.is-outlined(v-on:click='confirmRemove(influencer)',)
                  icon-ui(type='trash')
                  span.
                    Remove

      template(v-else)

        h5.title.is-4
          span.
            No Influencer yet.
        router-link.button.is-info(:to='{ name: "InfluencersAdd" }', ).
          Add your first Influencer

    confirm-modal(:active='activeModal', @close='checkAnswer($event)')
</template>

<script>
import toastr from 'toastr'
import CountriesList from '@/resources/countries'
import IconUi from '@/components/core/IconUi'
import ConfirmModal from '@/components/core/ConfirmModal'
import db from '@/db'

const influencersRef = db.ref('influencers')

export default {
  name: 'InfluencersList',
  components: {
    IconUi,
    ConfirmModal,
  },
  data () {
    return {
      activeModal: false,
      deletingInfluencer: null,
    }
  },
  firebase: {
    influencers: db.ref('influencers'),
  },
  methods: {
    checkAnswer (answer) {
      this.activeModal = false
      if (answer === 'yes') {
        this.remove(this.deletingInfluencer)
      }
    },
    confirmRemove (influencer) {
      this.deletingInfluencer = influencer
      this.activeModal = true
    },
    countryName (countryCode) {
      const country = CountriesList.find(country => country.code === countryCode)

      return countryCode === '' ? '-' : country.name
    },
    remove: function (influencer) {
      influencersRef.child(influencer['.key']).remove()
      toastr.success(`Influencer ${influencer.instagram} removed successfully`)
    },
  },
}
</script>

<style lang="stylus">
.InfluencersList
  .button
    margin-right 5px

    &:last-children
      margin-right 0
</style>
