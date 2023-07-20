/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/404',
          name: 'NotFound',
          component: NotFound
        },
        { path: '/:pathMatch(.*)*', component: NotFound },
      ]
    },
  ]
});

export default router;
