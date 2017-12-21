<script>
import FormField from '@/components/core/FormField'
import CountriesList from '@/resources/countries'

export default {
  name: 'SelectCountry',
  extends: FormField,
  props: {
    type: {
      default: 'select',
      type: String,
    },
  },
  beforeMount () {
    this.selectOptions = CountriesList.map((item) => {
      return {
        name: item.name,
        value: item.code,
      }
    })
  },
}
</script>

<style lang="stylus">
// .SelectCountry
</style>
