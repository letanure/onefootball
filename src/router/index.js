import Vue from 'vue'
import Router from 'vue-router'
import HomeDashboard from '@/components/HomeDashboard'
import CategoriesAdd from '@/components/CategoriesAdd'
import CategoriesList from '@/components/CategoriesList'
import InfluencersAdd from '@/components/InfluencersAdd'
import InfluencersList from '@/components/InfluencersList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeDashboard',
      component: HomeDashboard,
      meta: {
        title: 'Dashboard'
      }
    },

    // Influencers
    {
      path: '/influencers/',
      name: 'InfluencersList',
      component: InfluencersList,
      meta: {
        title: 'Influencers'
      },
      children: [
        {
          path: 'add',
          name: 'InfluencersAdd',
          component: InfluencersAdd,
          meta: {
            title: 'Add Influencer'
          }
        }
      ]
    },

    // Categories
    {
      path: '/categories/',
      name: 'CategoriesList',
      component: CategoriesList,
      meta: {
        title: 'Categories'
      },
      children: [
        {
          path: 'add',
          name: 'CategoriesAdd',
          component: CategoriesAdd,
          meta: {
            title: 'Categories / Add Category'
          }
        },
        {
          path: 'edit/:categoryKey',
          name: 'CategoriesEdit',
          component: CategoriesAdd,
          props: true,
          meta: {
            title: 'Categories / Edit Category'
          }
        }
      ]
    }
  ]
})
