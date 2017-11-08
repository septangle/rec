// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import './stylus/main.styl'
import RegisterView from './pages/RegisterView'
import store from './store'

Vue.use(Vuetify)
Vue.use(vuex)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<RegisterView/>',
  components: {RegisterView}
})
