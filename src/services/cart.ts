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
