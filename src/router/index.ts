import { createRouter, createWebHashHistory } from 'vue-router'
import Overview from '@/views/Overview.vue'

const routes = [
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

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
