import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Overview from '@/views/Overview.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Overview
  },
  {
    path: '/slides/:campaign',
    name: 'Slides',
    props: true,
    component: () => import('@/views/Slides.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
