import Vue from 'vue'
import Router from 'vue-router'
import IviewPage from '@/components/IviewPage'
import NativePage from '@/components/NativePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NativePage',
      component: NativePage
    },
    {
      path: '/iview',
      name: 'IviewPage',
      component: IviewPage
    }
  ]
})
