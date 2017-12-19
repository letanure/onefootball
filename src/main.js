import Vue from 'vue'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'

Vue.use(Vuelidate)
Vue.use(VueFire)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
