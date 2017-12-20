<script>
import FormField from '@/components/core/FormField'
import db from '@/db'

const categoriessRef = db.ref('categories')

export default {
  name: 'SelectCategory',
  extends: FormField,
  firebase: {
    categories: categoriessRef,
  },
  beforeMount () {
    this.selectOptions = this.categories.map((item) => {
      return {
        name: item.name,
        value: item.slug,
      }
    })
  },
}
</script>

<style lang="stylus">
// .SelectCategory
</style>
