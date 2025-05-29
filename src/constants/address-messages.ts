import type { AddressMessages } from '../models/models';

export const msg: AddressMessages = {
  billing: { text: 'Default Billing Address', icon: 'mdi-credit-card-outline' },
  shipping: { text: 'Default Shipping Address', icon: 'mdi-truck-delivery-outline' },
  saved: { text: 'Saved Address', icon: 'mdi-map-marker-outline' },
  other: { text: 'Other Addresses', icon: 'mdi-map-marker-outline' },
};
