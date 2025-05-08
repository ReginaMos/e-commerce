import { apiRoot } from './build-client';
import type { MyCustomerDraft } from '@commercetools/platform-sdk';

export async function createCustomer(customer: MyCustomerDraft) {
  const result = await apiRoot.me().signup().post({ body: customer }).execute();
  console.log('Customer created:', result.body);
  return result.body;
}
