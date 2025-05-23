import { apiRoot, buildCustomerClient, resetClient } from './build-client';
import type { Customer, MyCustomerDraft, MyCustomerSignin } from '@commercetools/platform-sdk';
import { USER_KEY } from '../constants/local-storage';
import { ref } from 'vue';

const isAuth = ref(!!localStorage.getItem(USER_KEY));

export function useAuth() {
  const checkAuth = () => {
    isAuth.value = !!localStorage.getItem(USER_KEY);
  };

  async function loginCustomer(credentials: MyCustomerSignin) {
    const result = await buildCustomerClient({ password: credentials.password, username: credentials.email })
      .me()
      .login()
      .post({ body: credentials })
      .execute();

    console.log('Customer logged in:', result.body);

    if (result.body.customer) {
      localStorage.setItem(USER_KEY, JSON.stringify(result.body.customer));
    }
    checkAuth();
    return result.body;
  }

  function logoutCustomer() {
    localStorage.removeItem(USER_KEY);
    resetClient();
    checkAuth();
  }

  async function createCustomer(customer: MyCustomerDraft) {
    const result = await apiRoot.me().signup().post({ body: customer }).execute();
    console.log('Customer created:', result.body);
    if (result.body.customer) {
      localStorage.setItem(USER_KEY, JSON.stringify(result.body.customer));
    }
    checkAuth();
    return result.body;
  }
  return { isAuth, loginCustomer, logoutCustomer, createCustomer, getCustomer };
}

export function getCustomer() {
  const data = localStorage.getItem(USER_KEY);
  if (!data) {
    throw new Error('Customer not found');
  }

  try {
    return JSON.parse(data) as Customer;
  } catch {
    throw new Error('Customer data corrupted');
  }
}
