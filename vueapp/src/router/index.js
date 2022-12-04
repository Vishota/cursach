import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import AnnouncementView from '../views/AnnouncementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/announcements/:id',
      name: 'announcement',
      component: AnnouncementView
    }
  ]
})

export default router
