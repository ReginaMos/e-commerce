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

export async function removeCartItem({ id, version }: Cart, lineItemId: string): Promise<Cart> {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItemId,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Failed to remove cart item:', error);
    throw new Error('Failed to remove item from cart.');
  }
}

export async function updateCartItemQuantity(
  { id, version }: Cart,
  lineItemId: string,
  quantity: number
): Promise<Cart> {
  try {
    const response = await apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItemId,
              quantity: quantity,
            },
          ],
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Failed to update item quantity:', error);
    throw new Error('Failed to update item quantity.');
  }
}
