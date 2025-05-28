import type { LinkItem } from '../models/models';

export const Links: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CONTACT: { NAME: 'Contact', LINK: '/contact' },
  ABOUT: { NAME: 'About', LINK: '/about' },
  WISHLIST: { NAME: 'Wishlist', LINK: '/wishlist' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
  LOGIN: { NAME: 'Login', LINK: 'login' },
  USER: { NAME: 'Account', LINK: '/account' },
  CART: { NAME: 'Cart', LINK: '/cart' },
  PRODUCT: { NAME: 'Product', LINK: '/product' },
  CATALOG: { NAME: 'Catalog', LINK: '/catalog' },
  SEARCH: { NAME: 'Search', LINK: '/search' },
  NOTFOUND: { NAME: '404', LINK: '/404' },
};

export const MenuLinks: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CONTACT: { NAME: 'Catalog', LINK: '/catalog' },
  ABOUT: { NAME: 'About', LINK: '/about' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
  LOGIN: { NAME: 'Login', LINK: '/login' },
};

export const MobileMenuLinks: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CATALOG: { NAME: 'Catalog', LINK: '/catalog' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
  LOGIN: { NAME: 'Login', LINK: '/login' },
  USER: { NAME: 'Account', LINK: '/account' },
  WISHLIST: { NAME: 'Wishlist', LINK: '/wishlist' },
  CART: { NAME: 'Shop Cart', LINK: '/cart' },
  // CONTACT: { NAME: 'Contact', LINK: '/contact' },
  ABOUT: { NAME: 'About Us', LINK: '/about' },
};
