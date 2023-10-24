/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import ExamplePage from '../views/ExamplePage.vue';
import ExampleTable from '@/views/ExampleTable.vue';
import ExampleConfigProvider from '@/views/ExampleConfigProvider.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'examples',
          name: 'Example',
          component: ExamplePage,
        },
        {
          path: 'example-table',
          name: 'ExampleTable',
          component: ExampleTable,
        },
        {
          path: 'example-config-provider',
          name: 'ExampleConfigProvider',
          component: ExampleConfigProvider,
        },
      ]
    },
  ]
});

export default router;
