<template lang="pug">
  .UsersForm.box
    form(v-on:submit.prevent='submit',)

      form-field(v-model.trim='user.name',
        type='text',
        label='Name',
        placeholder='Short descritive name',
        :validations='$v.user.name')

      form-field(v-model.trim='user.email',
        type='email',
        label='Email',
        placeholder='example@mail.com',
        :validations='$v.user.email')

      .field
        .control
          button.button.is-info(type='submit').
            Save
</template>

<script>
import { email, minLength, required } from 'vuelidate/lib/validators'
import slugify from 'slugify'
import toastr from 'toastr'
import db from '@/db'
import FormField from '@/components/core/FormField'

const userssRef = db.ref('users')

export default {
  name: 'UsersForm',
  components: {
    FormField,
  },
  props: {
    itemSlug: {
      default: '',
      type: String,
    },
  },
  data () {
    return {
      user: {
        name: null,
        email: null,
        slug: null,
      },
    }
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
    },
  },
  firebase: {
    users: userssRef,
  },
  watch: {
    'user.name': {
      handler (val) {
        this.user.slug = slugify(this.user.name)
      },
      deep: true,
    },

    itemSlug () {
      this.searchUsers()
    },
  },
  mounted () {
    userssRef.once('value', snapshot => {
      if (this.itemSlug) {
        this.searchUsers()
      }
      // this.loading = false
    })
  },
  methods: {
    add () {
      let userCopy = {...this.user}
      delete userCopy['.key']
      userssRef.push(userCopy)
      this.clean()
      this.$router.push({name: 'UsersList'})
      toastr.success(`Users ${this.user.name} added with success.`)
    },

    clean () {
      this.user.name = ''
      this.user.parentUsers = ''
    },

    isDuplicated () {
      return this.users.filter((user) => {
        return (user.email === this.user.email)
      }).length > 0
    },

    searchUsers () {
      const userEdit = this.users.filter((user) => {
        return user.slug === this.itemSlug
      })[0]
      if (userEdit) {
        this.user = userEdit
      }
    },

    submit () {
      const isDuplicated = this.isDuplicated()
      const isEdit = this.user.hasOwnProperty('.key')
      const isValid = !this.$v.$invalid

      this.$v.$touch()

      if (isValid) {
        if (!isEdit) {
          if (isDuplicated) {
            toastr.error(`Can't add the user ${this.user.name} this user name or slug already exists.`)
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
      let userCopy = {...this.user}
      delete userCopy['.key']
      this.$firebaseRefs.users.child(this.user['.key']).set(userCopy)
      toastr.success(`Users ${this.user.name} updated with success.`)
      this.$router.push({name: 'UsersList'})
    },
  },
}
</script>

<style lang="stylus" scoped>
// .UsersForm
</style>
