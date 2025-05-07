import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import MainPage from '../pages/MainPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import LayoutComponent from '../components/LayoutComponent.vue';
import LikesPage from '../pages/LikesPage.vue';
import CartPage from '../pages/CartPage.vue';
import UserPage from '../pages/UserPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import CatalogPage from '../pages/CatalogPage.vue';
import NotFoundComponent from '../pages/NotFoundComponent.vue';

import { Links } from '../constants/routersLinks';

const routes: Array<RouteRecordRaw> = [
  {
    path: Links.HOME.LINK,
    component: LayoutComponent,
    children: [
      {
        path: '',
        name: Links.HOME.NAME,
        component: MainPage,
      },
      {
        path: Links.CONTACT.LINK,
        name: Links.CONTACT.NAME,
        component: ContactsPage,
      },
      {
        path: Links.ABOUT.LINK,
        name: Links.ABOUT.NAME,
        component: AboutPage,
      },
      {
        path: Links.LOGIN.LINK,
        name: Links.LOGIN.NAME,
        component: LoginPage,
      },
      {
        path: Links.SIGNUP.LINK,
        name: Links.SIGNUP.NAME,
        component: RegistrationPage,
      },
      {
        path: Links.LIKES.LINK,
        name: Links.LIKES.NAME,
        component: LikesPage,
      },
      {
        path: Links.CART.LINK,
        name: Links.CART.NAME,
        component: CartPage,
      },
      {
        path: Links.USER.LINK,
        name: Links.USER.NAME,
        component: UserPage,
      },
      {
        path: Links.CATALOG.LINK,
        name: Links.CATALOG.NAME,
        component: CatalogPage,
      },
      {
        path: `Links.PRODUCT.LINK/${1}`,
        name: Links.PRODUCT.NAME,
        component: ProductPage,
      },

      {
        path: '/:pathMatch(.*)*',
        name: Links.NOTFOUND.NAME,
        component: NotFoundComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
