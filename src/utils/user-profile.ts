import type { Customer } from '@commercetools/platform-sdk';
import { countyList } from '../constants/country-list';
import type { AnyZodObject } from 'zod';
import { computed, type ComputedRef } from 'vue';

export function getAddress(customer: Customer) {
  const { addresses, defaultBillingAddressId: billId, defaultShippingAddressId: shipId } = customer;

  const findAddress = (id?: string) => addresses.find((add) => add.id === id);
  const other = addresses.filter((add) => add.id !== billId || add.id !== shipId);

  return {
    shipAddress: findAddress(shipId),
    billAddress: findAddress(billId),
    otherAddress: other,
  };
}

export function getCountryName(code: string) {
  const index = countyList.findIndex((country) => country.code === code);
  return index === -1 ? code : countyList[index].name;
}

export const getFieldRules = <T extends object>(
  fieldName: keyof T,
  schema: AnyZodObject
): ComputedRef<((v: string) => true | string)[]> => {
  return computed(() => [
    (v: string) => {
      const result = schema.shape[fieldName].safeParse(v);
      return result.success ? true : result.error.issues[0].message;
    },
  ]);
};
