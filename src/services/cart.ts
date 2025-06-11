import { apiRoot } from './build-client';

export async function getOrCreateCart() {
  // if (cart.value) return cart.value;
  try {
    const response = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'EUR',
        },
      })
      .execute();

    const cart = response.body;
    // console.log('cart', cart);
    return cart;
  } catch (error) {
    console.error('Error while receiving cart:', error);
    return null;
  }
}

export async function addProductToCart(productId: string, variantId: number, quantity = 1) {
  try {
    const currentCart = await getOrCreateCart();
    if (currentCart) {
      const response = await apiRoot
        .me()
        .carts()
        .withId({ ID: currentCart.id })
        .post({
          body: {
            version: currentCart.version,
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
      return response.body;
    }
  } catch (error) {
    console.error('Error while adding to cart:', error);
    return null;
  }
}

// async function createLineItemSizeType() {
//   const response = await apiRoot
//     .types()
//     .post({
//       body: {
//         key: 'line-item-size',
//         name: {
//           en: 'Line Item Size',
//         },
//         resourceTypeIds: ['line-item'],
//         fieldDefinitions: [
//           {
//             name: 'size',
//             label: { en: 'Size' },
//             required: true,
//             type: { name: 'String' },
//             inputHint: 'SingleLine',
//           },
//         ],
//       },
//     })
//     .execute();

//   console.log('✅ Created custom type:', response.body);
// }

// createLineItemSizeType().catch(console.error);

// export async function sendCart(currentCart) {
//   if (currentCart) {
//     const orderResponse = await apiRoot
//       .me()
//       .orders()
//       .post({
//         body: {
//           id: currentCart.id,
//           version: currentCart.version,
//         },
//       })
//       .execute();

//     console.log('✅ Order created:', orderResponse.body);
//   }
// }
