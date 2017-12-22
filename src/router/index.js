import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import {
  CategoriesForm,
  CategoriesList,
  Error404,
  HomeDashboard,
  InfluencersForm,
  InfluencersList,
  SignIn,
  SignUp,
  UsersForm,
  UsersList
} from '@/components/'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active',
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
          name: 'InfluencersForm',
          component: InfluencersForm,
          meta: {
            title: 'Add Influencer',
            requiresAuth: true,
          },
        },
        {
          path: 'edit/:influencerSlug',
          name: 'InfluencersEdit',
          component: CategoriesForm,
          props: true,
          meta: {
            title: 'Influencers / Influencer User',
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
          name: 'CategoriesForm',
          component: CategoriesForm,
          meta: {
            title: 'Categories / Add Category',
            requiresAuth: true,
          },
        },
        {
          path: 'edit/:categorySlug',
          name: 'CategoriesEdit',
          component: CategoriesForm,
          props: true,
          meta: {
            title: 'Categories / Edit Category',
            requiresAuth: true,
          },
        },
      ],
    },

    // Users
    {
      path: '/users/',
      name: 'UsersList',
      component: UsersList,
      meta: {
        title: 'Users',
      },
      children: [
        {
          path: 'add',
          name: 'UsersAdd',
          component: UsersForm,
          meta: {
            title: 'Users / Add User',
            requiresAuth: true,
          },
        },
        {
          path: 'edit/:itemSlug',
          name: 'UsersEdit',
          component: UsersForm,
          props: true,
          meta: {
            title: 'Users / Edit User',
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
