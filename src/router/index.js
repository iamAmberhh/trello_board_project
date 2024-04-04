import { createRouter, createWebHashHistory } from 'vue-router'
import providerModule from './modules/provider-module'
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
    name: 'Login',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/boardView',
    children: [
      {
        path: 'boardView',
        name: 'boardView',
        component: () => import('@/views/BoardView.vue'),
        meta: {
          title: 'BoardView',
          icon: 'board',
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path:'',
        name: 'Table',
        component: () => import('@/views/TableView.vue'),
        meta: {
          title: 'TableView',
          icon: 'table',
        }

      }
    ]
  },
]

// 設置動態路由
export const roleCodeRoutes = [
  ... providerModule,
]

// 404 page must be placed at the end !!!
export const asyncRoutes = [
  {
    path: '/:catchAll(.*)',
    name: 'CatchAll',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
