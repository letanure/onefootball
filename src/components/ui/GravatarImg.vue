<template lang="pug">
  img.GravatarImg(:src="url", :alt="alt")
</template>

<script>
import md5 from 'md5'

export default {
  name: 'GravatarImg',
  props: {
    email: {
      default: '',
      type: String,
    },
    hash: {
      default: '',
      type: String,
    },
    size: {
      default: 80,
      type: Number,
    },
    defaultImg: {
      default: 'retro',
      type: String,
    },
    rating: {
      default: 'g',
      type: String,
    },
    alt: {
      default: 'Avatar',
      type: String,
    },
  },
  computed: {
    url () {
      const img = [
        '//www.gravatar.com/avatar/',
        this.hash || md5(this.email.trim().toLowerCase()),
        `?s=${this.size}`,
        `&d=${this.defaultImg}`,
        `&r=${this.rating}`,
      ]
      return img.join('')
    },
  },
}
</script>

<style lang="stylus">
.GravatarImg
  border-radius 100%
</style>
