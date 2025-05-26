import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import MainPage from '../pages/MainPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import LayoutComponent from '../components/LayoutComponent.vue';
import WishListPage from '../pages/WishListPage.vue';
import CartPage from '../pages/CartPage.vue';
import UserPage from '../pages/UserPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import CatalogPage from '../pages/CatalogPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import SearchPage from '../pages/SearchPage.vue';

import { Links } from '../constants/routersLinks';
import { USER_KEY } from '../constants/local-storage';

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
        path: Links.WISHLIST.LINK,
        name: Links.WISHLIST.NAME,
        component: WishListPage,
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
        path: Links.SEARCH.LINK,
        name: Links.SEARCH.NAME,
        component: SearchPage,
      },
      {
        path: `${Links.PRODUCT.LINK}/:id`,
        name: Links.PRODUCT.NAME,
        component: ProductPage,
      },
      {
        path: '/:pathMatch(.*)*',
        name: Links.NOTFOUND.NAME,
        component: NotFoundPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const isAuthenticated = localStorage.getItem(USER_KEY);
  if (!isAuthenticated && to.name === Links.USER.NAME) {
    return { name: Links.SIGNUP.NAME };
  }
  if (isAuthenticated && (to.name === Links.SIGNUP.NAME || to.name === Links.LOGIN.NAME)) {
    return { name: Links.HOME.NAME };
  }
});

export default router;
