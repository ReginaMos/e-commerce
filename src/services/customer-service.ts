import { ref } from 'vue';
import type { Customer, MyCustomerDraft, MyCustomerSignin, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { USER_KEY } from '../constants/local-storage';
import { formatDateISO8601 } from '../utils/format-date';
import { apiRoot, buildCustomerClient, resetClient } from './build-client';
import type { AddressData, PersonalData, UpdatePasswordData } from '../utils/registration-schema';

export const isAuth = ref(!!localStorage.getItem(USER_KEY));

const checkAuth = () => {
  isAuth.value = !!localStorage.getItem(USER_KEY);
};

export async function loginCustomer(credentials: MyCustomerSignin) {
  const result = await buildCustomerClient({ password: credentials.password, username: credentials.email })
    .me()
    .login()
    .post({ body: credentials })
    .execute();

  if (result.body.customer) {
    localStorage.setItem(USER_KEY, JSON.stringify(result.body.customer));
  }
  checkAuth();
  return result.body;
}

export function logoutCustomer() {
  localStorage.removeItem(USER_KEY);
  resetClient();
  checkAuth();
}

export async function createCustomer(customer: MyCustomerDraft) {
  const result = await apiRoot.me().signup().post({ body: customer }).execute();

  await loginCustomer({
    email: customer.email,
    password: customer.password,
  });

  return result.body;
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

export async function updateCustomerPassword(data: UpdatePasswordData) {
  const customer = getCustomer();

  const response = await apiRoot
    .me()
    .password()
    .post({
      body: {
        version: customer.version,
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    })
    .execute();

  if (response.statusCode === 200) {
    localStorage.setItem(USER_KEY, JSON.stringify(response.body));
    await loginCustomer({ email: customer.email, password: data.newPassword });
  }

  return response.body;
}

export async function addCustomerAddress(
  customer: Customer,
  address: AddressData,
  defaultShipping = false,
  defaultBilling = false
) {
  const actions: MyCustomerUpdateAction[] = [
    {
      action: 'addAddress',
      address,
    },
  ];

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

  const newAddress = response.body.addresses[response.body.addresses.length - 1];
  const defaultActions: MyCustomerUpdateAction[] = [];
  if (defaultShipping) {
    defaultActions.push({ action: 'setDefaultShippingAddress', addressId: newAddress.id });
  }
  if (defaultBilling) {
    defaultActions.push({ action: 'setDefaultBillingAddress', addressId: newAddress.id });
  }
  if (defaultActions.length) {
    const responseSet = await apiRoot
      .me()
      .post({
        body: {
          version: response.body.version,
          actions: defaultActions,
        },
      })
      .execute();
    localStorage.setItem(USER_KEY, JSON.stringify(responseSet.body));
  }

  return response.body;
}

export async function removeCustomerAddress(customer: Customer, addressId: string) {
  const actions: MyCustomerUpdateAction[] = [{ action: 'removeAddress', addressId }];
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

export async function updateCustomerAddress(
  customer: Customer,
  addressId: string,
  address: AddressData,
  setDefaultShipping = false,
  setDefaultBilling = false
) {
  const oldAddress = customer.addresses.find((add) => add.id === addressId);
  if (!oldAddress) return;
  const actions: MyCustomerUpdateAction[] = [
    {
      action: 'changeAddress',
      addressId,
      address,
    },
  ];

  if (customer.defaultBillingAddressId === addressId && !setDefaultBilling) {
    actions.push({ action: 'removeBillingAddressId', addressId });
  }
  if (customer.defaultBillingAddressId !== addressId && setDefaultBilling) {
    actions.push({ action: 'setDefaultBillingAddress', addressId });
  }

  if (customer.defaultShippingAddressId === addressId && !setDefaultShipping) {
    actions.push({ action: 'removeShippingAddressId', addressId });
  }
  if (customer.defaultShippingAddressId !== addressId && setDefaultShipping) {
    actions.push({ action: 'setDefaultShippingAddress', addressId });
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

  localStorage.setItem(USER_KEY, JSON.stringify(response.body));
  return response.body;
}
