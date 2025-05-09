import { apiRoot } from './build-client';
import type { MyCustomerSignin } from '@commercetools/platform-sdk';

export async function loginCustomer(credentials: MyCustomerSignin) {
  const result = await apiRoot.me().login().post({ body: credentials }).execute();

  console.log('Customer logged in:', result.body);
  return result.body;
}
