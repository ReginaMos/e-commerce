import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import MainPage from '../pages/MainPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import LayoutComponent from '../components/LayoutComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LayoutComponent,
    children: [
      {
        path: '',
        name: 'home',
        component: MainPage,
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: ContactsPage,
      },
      {
        path: 'about',
        name: 'about',
        component: AboutPage,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage,
      },
      {
        path: 'signup',
        name: 'signup',
        component: RegistrationPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
