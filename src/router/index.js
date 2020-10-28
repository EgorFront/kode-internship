import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history',
})

// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
  const isUserAuth = store.getters['user/loggedIn']
  const authRoutes = ['login', 'otp']

  if (!isUserAuth) {
    await store.dispatch('auth/auth')
  }

  if (!isUserAuth) {
    redirectTo('login')
  } else {
    if (authRoutes.includes(routeTo.name)) {
      redirectTo('home')
    }

    next()
  }

  function redirectTo(name) {
    if (routeTo.name === name) return next()
    else return next({ name })
  }
})

export default router
