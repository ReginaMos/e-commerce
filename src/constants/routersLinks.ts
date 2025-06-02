import type { LinkItem } from '../models/models';

type Link =
  | 'HOME'
  | 'CONTACTS'
  | 'ABOUT'
  | 'WISHLIST'
  | 'SIGNUP'
  | 'LOGIN'
  | 'USER'
  | 'ADDRESS'
  | 'PERSONAL'
  | 'CART'
  | 'PRODUCT'
  | 'CATALOG'
  | 'SEARCH'
  | 'NOTFOUND';

export const Links: Record<Link, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CONTACTS: { NAME: 'Contacts', LINK: '/contacts' },
  ABOUT: { NAME: 'About', LINK: '/about' },
  WISHLIST: { NAME: 'Wishlist', LINK: '/wishlist' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
  LOGIN: { NAME: 'Login', LINK: 'login' },
  USER: { NAME: 'Account', LINK: '/account' },
  ADDRESS: { NAME: 'Address Book', LINK: '/account/address-book' },
  PERSONAL: { NAME: 'Personal Details', LINK: '/account/personal-details' },
  CART: { NAME: 'Cart', LINK: '/cart' },
  PRODUCT: { NAME: 'Product', LINK: '/product' },
  CATALOG: { NAME: 'Catalog', LINK: '/catalog' },
  SEARCH: { NAME: 'Search', LINK: '/search' },
  NOTFOUND: { NAME: '404', LINK: '/404' },
};

export const MenuLinks: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CATALOG: { NAME: 'Catalog', LINK: '/catalog' },
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
  CART: { NAME: 'Shop Cart', LINK: '/cart' },
  WISHLIST: { NAME: 'Wishlist', LINK: '/wishlist' },
  ABOUT: { NAME: 'About Us', LINK: '/about' },
  CONTACTS: { NAME: 'Contacts', LINK: '/contacts' },
};
