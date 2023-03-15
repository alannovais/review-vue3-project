import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '@/pages/TaskListView.vue'

const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: '/',
      name: 'TaskListView',
      component: TaskListView
    },
    {
      path: '/task/:id?',
      name: 'DetailContatctView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/DetailContatctView.vue')
    },
  ]
})

export default router
