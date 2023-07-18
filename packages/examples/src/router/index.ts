/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/homeView.vue';
// @ts-ignore
import Card from '@/views/SCard.vue'; // @ts-ignore
import Cover from '@/views/SCover.vue'; // @ts-ignore
import BasicInfo from '@/views/SBasicInfo.vue'; // @ts-ignore

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: '/card', name: 'Card', component: Card },
        { path: '/cover', name: 'Cover', component: Cover },
        { path: '/basic-info', name: 'BasicInfo', component: BasicInfo },
      ]
    },
  ]
});

export default router;
