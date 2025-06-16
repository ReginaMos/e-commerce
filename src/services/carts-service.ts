import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './build-client';
import { ref } from 'vue';

export const activeCart = ref<Cart | null>(null);

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
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
    })
    .execute();

  activeCart.value = response.body;
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
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

  activeCart.value = response.body;
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

  activeCart.value = response.body;
  return response.body;
}

export async function applyDiscountCode({ id, version }: Cart, code: string): Promise<Cart> {
  const response = await apiRoot
    .me()
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();

  activeCart.value = response.body;
  return response.body;
}

export async function getActiveCart(): Promise<Cart> {
  try {
    const response = await apiRoot.me().activeCart().get().execute();
    activeCart.value = response.body;
    return response.body;
  } catch {
    const responseNewCart = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();
    activeCart.value = responseNewCart.body;
    return responseNewCart.body;
  }
}

export async function addProductToCart(productId: string, variantId: number, quantity = 1) {
  try {
    if (activeCart.value) {
      const response = await apiRoot
        .me()
        .carts()
        .withId({ ID: activeCart.value.id })
        .post({
          body: {
            version: activeCart.value.version,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId,
                quantity,
                // custom: {
                //   type: {
                //     typeId: 'type',
                //     key: 'line-item-size',
                //   },
                //   fields: {
                //     size,
                //   },
                // },
              },
            ],
          },
        })
        .execute();

      activeCart.value = response.body;
      return response.body;
    }
  } catch {
    return null;
  }
}
