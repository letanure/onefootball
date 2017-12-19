import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import {
  HomeDashboard,
  Error404,
  CategoriesAdd,
  CategoriesList,
  InfluencersAdd,
  InfluencersList,
  SignIn,
  SignUp
} from '@/components/'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Sign In
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp,
    },
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

    // 404
    {
      path: '/404',
      name: '404',
      component: Error404,
    },
    {
      path: '*',
      redirect: '/404',
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
