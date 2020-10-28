export default [
  {
    path: '/',
    component: () => lazyLoadView(import('@views/layouts/Main.vue')),
    children: [
      {
        path: '/',
        component: () => lazyLoadView(import('@views/Home.vue')),
        name: 'home',
      },

      {
        path: '/about',
        name: 'about',
        component: () => lazyLoadView(import('@views/About.vue')),
      },
    ],
  },

  {
    path: '/auth',
    component: () => lazyLoadView(import('@views/layouts/Authentication.vue')),
    redirect: { name: 'login' },
    children: [
      {
        path: '/login',
        component: () => lazyLoadView(import('@views/Login.vue')),
        name: 'login',
      },

      {
        path: '/otp',
        component: () => lazyLoadView(import('@views/Otp.vue')),
        name: 'otp',
      },
    ],
  },

  {
    path: '*',
    redirect: { name: 'home' },
  },
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    // loading: require('@views/_loading.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/disabled.vue').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 15000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
