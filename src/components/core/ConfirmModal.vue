<template lang="pug">
  .ConfirmModal.modal(:class='{"is-active": isActive}', )
    .modal-background(@click='close("close")')
    .modal-card()
      .modal-card-head()
        .modal-card-title() Delete Influencer?
        button.delete(aria-label="close", @click='close("close")', )
      .modal-card-body() Deleting a influencer will remove it from your list.
      .modal-card-foot.has-text-right()
        button.button(@click='close("no")', ) No, keep the influencer
        button.button.is-danger(@click='close("yes")') Yes, delete influencer

</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    active: {
      default: false,
      type: Boolean,
    },
  },
  data () {
    return {
      isActive: 'no',
    }
  },
  watch: {
    active () {
      this.isActive = this.active
    },
  },
  created () {
    this.isActive = this.active
  },
  methods: {
    close (answer) {
      this.isActive = false
      this.$emit('close', answer)
    },
  },
}
</script>

<style lang="stylus">
  .ConfirmModal
    .modal-card-foot
      &.has-text-right
        justify-content flex-end
</style>
