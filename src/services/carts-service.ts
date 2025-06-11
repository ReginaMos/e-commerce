import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './build-client';

export async function getCartById(cartId: string): Promise<Cart> {
  try {
    const response = await apiRoot.me().carts().withId({ ID: cartId }).get().execute();

    return response.body;
  } catch (error) {
    console.error('Failed to fetch cart by id:', error);
    throw new Error('Failed to fetch cart.');
  }
}
