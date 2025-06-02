import { describe, it, expect } from 'vitest';
import { getAddress, getCountryName } from '../utils/user-profile';
import type { Customer } from '@commercetools/platform-sdk';

describe('Get address', () => {
  const addresses = [
    { id: '1', street: 'A' },
    { id: '2', street: 'B' },
    { id: '3', street: 'C' },
  ];

  it('returns correct addresses when billing and shipping are different', () => {
    const customer = {
      addresses,
      defaultBillingAddressId: '1',
      defaultShippingAddressId: '2',
    } as unknown as Customer;
    const result = getAddress(customer);
    expect(result.billAddress).toEqual(addresses[0]);
    expect(result.shipAddress).toEqual(addresses[1]);
    expect(result.otherAddress).toEqual([addresses[2]]);
  });

  it('returns correct addresses when billing and shipping are the same', () => {
    const customer = {
      addresses,
      defaultBillingAddressId: '1',
      defaultShippingAddressId: '1',
    } as unknown as Customer;
    const result = getAddress(customer);
    expect(result.billAddress).toEqual(addresses[0]);
    expect(result.shipAddress).toEqual(addresses[0]);
    expect(result.otherAddress).toEqual([addresses[1], addresses[2]]);
  });

  it('returns undefined and empty array when no addresses', () => {
    const customer = {
      addresses: [],
      defaultBillingAddressId: '1',
      defaultShippingAddressId: '2',
    } as unknown as Customer;
    const result = getAddress(customer);
    expect(result.billAddress).toBeUndefined();
    expect(result.shipAddress).toBeUndefined();
    expect(result.otherAddress).toEqual([]);
  });

  it('returns correct addresses when only one address', () => {
    const singleAddress = [{ id: '1', street: 'A' }];
    const customer = {
      addresses: singleAddress,
      defaultBillingAddressId: '1',
      defaultShippingAddressId: '1',
    } as unknown as Customer;
    const result = getAddress(customer);
    expect(result.billAddress).toEqual(singleAddress[0]);
    expect(result.shipAddress).toEqual(singleAddress[0]);
    expect(result.otherAddress).toEqual([]);
  });

  it('otherAddress excludes billing and shipping addresses', () => {
    const customer = {
      addresses,
      defaultBillingAddressId: '1',
      defaultShippingAddressId: '2',
    } as unknown as Customer;
    const result = getAddress(customer);
    expect(result.otherAddress).not.toContain(result.billAddress);
    expect(result.otherAddress).not.toContain(result.shipAddress);
  });
});

describe('Get country name', () => {
  it('returns country name for known code', () => {
    expect(getCountryName('DE')).toBe('Germany');
    expect(getCountryName('FR')).toBe('France');
  });

  it('returns code itself for unknown code', () => {
    expect(getCountryName('XX')).toBe('XX');
  });

  it('returns code itself for empty string', () => {
    expect(getCountryName('')).toBe('');
  });
});
