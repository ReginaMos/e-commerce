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

export async function updateCustomerPersonal(original: PersonalData, updates: PersonalData) {
  const customer = getCustomer();
  const actions: MyCustomerUpdateAction[] = [];

  if (updates.firstName !== undefined && updates.firstName !== original.firstName) {
    actions.push({ action: 'setFirstName', firstName: updates.firstName });
  }
  if (updates.lastName !== undefined && updates.lastName !== original.lastName) {
    actions.push({ action: 'setLastName', lastName: updates.lastName });
  }
  if (updates.email !== undefined && updates.email !== original.email) {
    actions.push({ action: 'changeEmail', email: updates.email });
  }
  if (updates.dateOfBirth !== undefined && updates.dateOfBirth !== updates.dateOfBirth) {
    actions.push({ action: 'setDateOfBirth', dateOfBirth: formatDateISO8601(updates.dateOfBirth) });
  }

  if (actions.length === 0) {
    throw new Error('Nothing to update');
  }

  const response = await apiRoot
    .me()
    .post({
      body: {
        version: customer.version,
        actions,
      },
    })
    .execute();

  if (response.statusCode === 200) {
    localStorage.setItem(USER_KEY, JSON.stringify(response.body));
  }

  return response.body;
}
