import { apiRoot, buildCustomerClient, resetClient } from './build-client';
import type { MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { USER_KEY } from '../constants/local-storage';

export async function loginCustomer(credentials: MyCustomerSignin) {
  const result = await buildCustomerClient({ password: credentials.password, username: credentials.email })
    .me()
    .login()
    .post({ body: credentials })
    .execute();

  console.log('Customer logged in:', result.body);

  if (result.body.customer) {
    localStorage.setItem(USER_KEY, JSON.stringify(result.body.customer));
  }

  return result.body;
}

export function logoutCustomer() {
  localStorage.removeItemItem(USER_KEY);
  resetClient();
}

export async function createCustomer(customer: MyCustomerDraft) {
  const result = await apiRoot.me().signup().post({ body: customer }).execute();
  console.log('Customer created:', result.body);
  return result.body;
}
