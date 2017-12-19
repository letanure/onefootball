import Vue from 'vue'
import Firebase from 'firebase'
import Router from 'vue-router'
import HomeDashboard from '@/components/HomeDashboard'
import CategoriesAdd from '@/components/CategoriesAdd'
import CategoriesList from '@/components/CategoriesList'
import InfluencersAdd from '@/components/InfluencersAdd'
import InfluencersList from '@/components/InfluencersList'
import SignIn from '@/components/SignIn'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Sign In
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn,
      meta: {
        title: 'Login',
        requiresAuth: false,
      },
    },

    // Home
    {
      path: '/',
      name: 'HomeDashboard',
      component: HomeDashboard,
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
      },
    },

    // Influencers
    {
      path: '/influencers/',
      name: 'InfluencersList',
      component: InfluencersList,
      meta: {
        title: 'Influencers',
        requiresAuth: true,
      },
      children: [
        {
          path: 'add',
          name: 'InfluencersAdd',
          component: InfluencersAdd,
          meta: {
            title: 'Add Influencer',
            requiresAuth: true,
          },
        },
      ],
    },

    // Categories
    {
      path: '/categories/',
      name: 'CategoriesList',
      component: CategoriesList,
      meta: {
        title: 'Categories',
      },
      children: [
        {
          path: 'add',
          name: 'CategoriesAdd',
          component: CategoriesAdd,
          meta: {
            title: 'Categories / Add Category',
            requiresAuth: true,
          },
        },
        {
          path: 'edit/:categoryKey',
          name: 'CategoriesEdit',
          component: CategoriesAdd,
          props: true,
          meta: {
            title: 'Categories / Edit Category',
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/sign-in')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
