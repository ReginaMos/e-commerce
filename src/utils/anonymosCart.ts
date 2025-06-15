import type { ProductInfo } from '../models/models';
import type { Cart } from '@commercetools/platform-sdk';

export function saveAnonymosCartItem(productId: string, quantity: number) {
  const storedCart = JSON.parse(localStorage.getItem('anonymousCart') || '[]');

  const index = storedCart.findIndex((product: Cart) => product.id === productId);

  if (index === -1) {
    storedCart.push({ id: productId, quantity });
  } else {
    storedCart[index].quantity = quantity;
  }
  localStorage.setItem('anonymousCart', JSON.stringify(storedCart));
}

export function removeAnonymousCartItem(productId: string) {
  const storedCart = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
  const updatedCart = storedCart.filter((product: ProductInfo) => product.id !== productId);
  localStorage.setItem('anonymousCart', JSON.stringify(updatedCart));
}
