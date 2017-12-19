import Firebase from 'firebase'
import Vue from 'vue'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'
import App from './App'
import { store } from './store/store'
import router from './router'

Vue.use(Vuelidate)
Vue.use(VueFire)

Vue.config.productionTip = false

Firebase.auth().onAuthStateChanged(function (user) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store: store,
    router,
    components: { App },
    template: '<App/>',
  })
})
