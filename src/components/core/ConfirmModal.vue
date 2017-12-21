<template lang="pug">
  .ConfirmModal.modal(:class='{"is-active": isActive}', )
    .modal-background(@click='close("close")')
    .modal-card()
      .modal-card-head()
        .modal-card-title()
          | {{ title }}
        button.delete(aria-label="close", @click='close("close")', )
      .modal-card-body()
         | {{ message }}
      .modal-card-foot.has-text-right()
        button.button(@click='close("no")', )
          | {{ answerNo }}
        button.button.is-danger(@click='close("yes")')
          | {{ answerYes }}

</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    active: {
      default: false,
      type: Boolean,
    },
    answerNo: {
      default: '',
      type: String,
    },
    answerYes: {
      default: '',
      type: String,
    },
    message: {
      default: '',
      type: String,
    },
    title: {
      default: '',
      type: String,
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
