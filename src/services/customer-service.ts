import { apiRoot, buildCustomerClient, resetClient } from './build-client';
import type { Customer, MyCustomerDraft, MyCustomerSignin, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { USER_KEY } from '../constants/local-storage';
import { ref } from 'vue';
import type { PersonalData } from '../utils/registration-schema';
import { formatDateISO8601 } from '../utils/format-date';

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

export async function updateCustomerProfile(updates: PersonalData) {
  const customer = getCustomer();
  const actions: MyCustomerUpdateAction[] = [];

  if (updates.firstName !== undefined) {
    actions.push({ action: 'setFirstName', firstName: updates.firstName });
  }
  if (updates.lastName !== undefined) {
    actions.push({ action: 'setLastName', lastName: updates.lastName });
  }
  if (updates.email !== undefined) {
    actions.push({ action: 'changeEmail', email: updates.email });
  }
  if (updates.dateOfBirth !== undefined) {
    actions.push({ action: 'setDateOfBirth', dateOfBirth: formatDateISO8601(updates.dateOfBirth) });
  }

  if (actions.length === 0) return customer;

  const response = await apiRoot
    .me()
    .post({
      body: {
        version: customer.version,
        actions,
      },
    })
    .execute();

  localStorage.setItem(USER_KEY, JSON.stringify(response.body));

  return response.body;
}
