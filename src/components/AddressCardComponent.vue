<script setup lang="ts">
import type { Address } from '@commercetools/platform-sdk';
import { getCountryName } from '../utils/user-profile';
import { msg } from '../constants/address-messages';
import type { MessageType } from '../models/models';

defineProps<{
  address: Address | undefined;
  type: MessageType;
}>();

const emit = defineEmits<{
  (e: 'remove', addressId: string): void;
  (e: 'edit', addressId: string): void;
  (e: 'add', type: MessageType): void;
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
      <v-btn text="Edit" variant="tonal" @click="emit('edit', address.id ?? '')" />
      <v-btn text="Remove" variant="tonal" @click="emit('remove', address.id ?? '')" />
    </template>
    <template v-slot:actions v-else>
      <v-btn
        location="center"
        text="Add a new address"
        variant="tonal"
        class="text-center"
        @click="emit('add', type)"
      />
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
