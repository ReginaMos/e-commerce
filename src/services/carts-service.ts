import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from './build-client';
import { ref } from 'vue';
import { refreshCustomerData } from './customer-service';
import { USER_KEY } from '../constants/local-storage';

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
    const {
      body: { results },
    } = await apiRoot.me().carts().get().execute();

    if (results.length > 0) {
      activeCart.value = results[0];
      return results[0];
    }

    const response = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();

    activeCart.value = response.body;
    return response.body;
  } catch (error) {
    console.error('Failed to get or create cart:', error);
    throw new Error('Failed to get or create cart.');
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
  } catch (error) {
    console.error('Error while adding to cart:', error);
    return null;
  }
}

export async function initializeCart() {
  if (localStorage.getItem(USER_KEY)) {
    await refreshCustomerData();
  }
  await getActiveCart();
}

export async function mergeAnonymousCartIntoUserCart() {
  const anonymousCartItems = JSON.parse(localStorage.getItem('anonymousCart') || '[]');
  if (anonymousCartItems.length === 0) return;

  const cart = await getActiveCart();

  const actions = anonymousCartItems.map((item: {id: string, quantity: number}) => ({
    action: 'addLineItem',
    productId: item.id,
    quantity: item.quantity,
  }));

  const response = await apiRoot
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions,
      },
    })
    .execute();

  activeCart.value = response.body;
  localStorage.removeItem('anonymousCart');
}