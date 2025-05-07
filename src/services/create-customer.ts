import { apiRoot } from './build-client';
import type { MyCustomerDraft } from '@commercetools/platform-sdk';

export async function createCustomer(customer: MyCustomerDraft) {
  try {
    const result = await apiRoot.me().signup().post({ body: customer }).execute();
    console.log('Customer created:', result.body);
    return result.body;
  } catch (error: unknown) {
    console.error('Error creating customer:', error);
  }
}
