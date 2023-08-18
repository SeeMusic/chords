/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import ExamplePage from '../views/ExamplePage.vue';
import ExampleTable from '@/views/ExampleTable.vue';
import ComponentTesting from '@/views/ComponentTesting.vue';

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
          path: 'examples/child',
          name: 'example-child',
          component: ComponentTesting
        },
        {
          path: 'example-table',
          name: 'ExampleTable',
          component: ExampleTable,
        },
        {
          path: 'example-table/child',
          name: 'example-table-child',
          component: ComponentTesting
        },
      ]
    },
  ]
});

export default router;
