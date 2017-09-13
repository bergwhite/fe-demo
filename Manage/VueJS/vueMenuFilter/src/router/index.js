import Vue from 'vue'
import Router from 'vue-router'
import dataFilter from '@/components/dataFilter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dataFilter',
      component: dataFilter
    },
    {
      path: '/data-filter',
      name: 'dataFilter',
      component: dataFilter
    }
  ]
})
