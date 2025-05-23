import type { Customer } from '@commercetools/platform-sdk';

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
