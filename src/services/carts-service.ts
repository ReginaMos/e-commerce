import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './build-client';

export async function getCartById(cartId: string): Promise<Cart> {
  const response = await apiRoot.me().carts().withId({ ID: cartId }).get().execute();

  return response.body;
}

export async function removeCartItem({ id, version }: Cart, lineItemId: string): Promise<Cart> {
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
}

export async function updateCartItemQuantity(
  { id, version }: Cart,
  lineItemId: string,
  quantity: number
): Promise<Cart> {
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
}

export async function clearCart({ id, version, lineItems }: Cart): Promise<Cart> {
  const response = await apiRoot
    .me()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: lineItems.map((item) => ({
          action: 'removeLineItem',
          lineItemId: item.id,
        })),
      },
    })
    .execute();

  return response.body;
}
