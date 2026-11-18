import { createRouter, createWebHistory } from 'vue-router'
import GuitarsListView from '../views/GuitarsListView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'guitarsList',
      component: GuitarsListView,
    },
  ],
})

export default router
