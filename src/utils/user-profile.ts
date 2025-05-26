import type { Customer } from '@commercetools/platform-sdk';
import { countyList } from '../constants/country-list';

export function getAddress(customer: Customer) {
  const { addresses, defaultBillingAddressId: billId, defaultShippingAddressId: shipId } = customer;

  const findAddress = (id?: string) => addresses.find((add) => add.id === id) || undefined;
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
