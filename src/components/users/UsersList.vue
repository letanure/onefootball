<script>
import CollectionList from '@/components/core/CollectionList'
import db from '@/db'

const categoriessRef = db.ref('users')

export default {
  name: 'UsersList',
  extends: CollectionList,
  data () {
    return {
      collectionRef: categoriessRef,
      labelPlural: 'Users',
      routeNameAdd: 'UsersAdd',
      routeNameEdit: 'UsersEdit',
      labelSingular: 'User',
      collectionTable: [
        {
          header: 'Name',
          key: 'name',
        },
        {
          header: 'Parent category',
          key: 'parentCategory',
        },
        {
          header: 'Actions',
        },
      ],
    }
  },

  firebase: {
    collection: categoriessRef,
  },
}
</script>

<style lang="stylus">
// .UsersList
</style>
