import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import charactersRoutes from './routes/characters'

const routes: Array<RouteRecordRaw> = [
  ...charactersRoutes,
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/not-found.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
