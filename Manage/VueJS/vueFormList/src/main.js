// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import jQuery from './assets/jquery/jquery.min'
import './assets/bootstrap/bootstrap.min.css'

Vue.config.productionTip = false

Vue.prototype.$ = jQuery || $

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
