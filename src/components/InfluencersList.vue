<template lang="pug">
  .InfluencersList

    router-view

    table.table.is-striped.is-hoverable.is-fullwidth()
      thead
        tr
          th.
            Influencer
          th.
            Country
          th.
            Categories
          th
            abbr(title='Average engagement rate of all media. Engagement rate is based on the likes and comments received divided by the number of followers at the time of the post.').
              ER
          th.
            Media posted
          th.
            Actions
      tbody
        tr(v-for='influencer in influencers', )
          td.
            {{ influencer.instagram }}
          td.
            {{ influencer.country }}
          td
            .tag.
              {{ influencer.category1 }} a
            .tag.
              {{ influencer.category2 }} b
          td.
            0
          td.
            0
          td
            .button.is-danger.is-small.is-outlined(v-on:click='removeInfluencer(influencer)',)
              icon-ui(type='trash')
              span.
                Remove

</template>

<script>
import IconUi from '@/components/core/IconUi'
import db from '@/db'

const influencersRef = db.ref('influencers')

export default {
  name: 'InfluencersList',
  components: {
    IconUi,
  },
  data () {
    return {
    }
  },
  firebase: {
    influencers: db.ref('influencers'),
  },
  methods: {
    removeInfluencer: function (influencer) {
      influencersRef.child(influencer['.key']).remove()
      // toastr.success('Book removed successfully')
    },
  },
}
</script>

<style lang="stylus">
// .InfluencersList
</style>
