import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Index', path: '', component: () => import('pages/Index.vue') },
      {
        name: 'Login',
        path: '/login',
        component: () => import('pages/Login.vue'),
        props: true
      },
      {
        name: 'Test',
        path: '/test',
        component: () => import('pages/Test.vue'),
        props: true
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
