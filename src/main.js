import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@store'
import vuetify from './plugins/vuetify'

// https://vuelidate.js.org/
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

// Custom plugin for helper validate
import helperValidate from '@src/plugins/helperValidate.js'
Vue.use(helperValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
