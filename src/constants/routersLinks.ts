type LinkItem = {
  NAME: string;
  LINK: string;
};
export const Links: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CONTACT: { NAME: 'Contact', LINK: '/contact' },
  ABOUT: { NAME: 'About', LINK: '/about' },
  LIKES: { NAME: 'Likes', LINK: '/likes' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
  LOGIN: { NAME: 'Login', LINK: 'login' },
  USER: { NAME: 'User', LINK: '/user' },
  CART: { NAME: 'Cart', LINK: '/cart' },
  PRODUCT: { NAME: 'Product', LINK: '/product' },
  CATALOG: { NAME: 'Catalog', LINK: '/catalog' },
  NOTFOUND: { NAME: '404', LINK: '/404' },
};

export const MenuLinks: Record<string, LinkItem> = {
  HOME: { NAME: 'Home', LINK: '/' },
  CONTACT: { NAME: 'Contact', LINK: '/contact' },
  ABOUT: { NAME: 'About', LINK: '/about' },
  SIGNUP: { NAME: 'Sign Up', LINK: '/signup' },
};
