import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/announcements/:id/edit',
      name: 'edit',
      component: () => import('../views/AnnouncementEditView.vue')
    },
    {
      path: '/profiles/:id',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/search/:text',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/search',
      name: 'searchblank',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/NewAnnouncementView.vue')
    }
  ]
})

export default router
