import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Overview from '../views/Overview.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "slides" */ '../views/Slides.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
