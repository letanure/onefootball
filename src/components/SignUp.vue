<template lang="pug">
  section.section
    h1.title.has-text-centered Sign-up
    .columns
      .column.is-one-third
        .card
          .card-header.is-centered
            h2.card-header-title.is-centered Create an Account
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
              button.button.is-primary(type='submit', v-on:click='signUp') Sign-up

</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUp () {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace('dashboard')
          },
          error => {
            alert(error.message)
          }
        )
    },
  },
}
</script>

<style>
// Basic styles are pulled in from the Bulma framework https://bulma.io/
// These style tags could be omitted as they arre not used.
</style>
