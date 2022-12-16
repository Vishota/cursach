import { createRouter, createWebHistory } from 'vue-router'
import announcements from '@/assets/modules/Announcements/AnnouncementsModule';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/announcements/:id',
      name: 'announcement',
      component: () => import('../views/AnnouncementView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/UserView.vue')
    }
  ]
})

export default router
