<template lang="pug">
  section.section
    h1.title.has-text-centered Sign-in
    .columns
      .column.is-one-third
        .card
          .card-header.is-centered
            h2.card-header-title.is-centered Sign in to Your Account
          .card-content
            form(v-on:submit.prevent='')
              .field
                label.label Email
                .control
                  input.input(type='email', placeholder='joe@bloggs.com', v-model='email')
              .field
                label.label Password
                .control
                  input.input(type='password', v-model='password')
              button.button.is-primary(type='submit', v-on:click='signIn') Sign-in

</template>

<script>
import Firebase from 'firebase'
import toastr from 'toastr'

export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signIn () {
      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace({ name: 'HomeDashboard' })
          },
          error => {
            toastr.error(error.message)
          }
        )
    },
  },
}
</script>

<style>

</style>
