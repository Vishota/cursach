import { createRouter, createWebHistory } from 'vue-router'
import Lang from '../assets/modules/Lang'

new Lang()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    }
  ]
})

export default router
