import { RouteRecordRaw } from 'vue-router'

const characters: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'listCharacters',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/personagem/:id',
    name: 'character',
    component: () => import('@/views/character.vue'),
  },
  {
    path: '/personagem/:id',
    name: 'character',
    component: () => import('@/views/character.vue'),
  },
  {
    path: '/episodio/:id',
    name: 'episode',
    component: () => import('@/views/episodes.vue'),
  },
]

export default characters
