import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Main = () => import('@/views/main/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: Main
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
