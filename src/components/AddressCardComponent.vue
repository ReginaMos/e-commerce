<script setup lang="ts">
import type { Address } from '@commercetools/platform-sdk';
import { getCountryName } from '../utils/user-profile';

type Messages = 'billing' | 'shipping' | 'saved';
type MessagesProps = Record<Messages, { text: string; icon: string }>;

const msg: MessagesProps = {
  billing: { text: 'Default Billing Address', icon: 'mdi-credit-card-outline' },
  shipping: { text: 'Default Shipping Address', icon: 'mdi-truck-delivery-outline' },
  saved: { text: 'Saved Address', icon: 'mdi-map-marker-outline' },
};

defineProps<{
  address: Address | undefined;
  type: Messages;
}>();
</script>

<template>
  <v-card
    variant="outlined"
    :prepend-icon="address ? msg[type].icon : ''"
    class="text-left"
    :title="address ? msg[type].text : ''"
  >
    <template v-slot:actions v-if="address">
      <v-btn text="Edit" variant="tonal" />
      <v-btn text="Remove" variant="tonal" />
    </template>
    <template v-slot:actions v-else>
      <v-btn location="center" text="Add a new address" variant="tonal" class="text-center" />
    </template>
    <v-list v-if="address" density="compact">
      <v-list-item>
        <strong>Street</strong> <span>{{ address.streetName }}</span>
      </v-list-item>
      <v-list-item>
        <strong>City</strong> <span>{{ address.city }}</span>
      </v-list-item>
      <v-list-item>
        <strong>Postal code</strong> <span>{{ address.postalCode }}</span>
      </v-list-item>
      <v-list-item>
        <strong>Country</strong> <span>{{ getCountryName(address.country) }}</span>
      </v-list-item>
    </v-list>
    <v-card-text v-else class="text-center text-body-1">
      <v-icon :icon="msg[type].icon"></v-icon>
      {{ 'No ' + msg[type].text }}
    </v-card-text>
  </v-card>
</template>
