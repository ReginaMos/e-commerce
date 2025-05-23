<script setup lang="ts">
import { getCustomer } from '../services/customer-service';
import { getAddress } from '../utils/user-profile';
import AddressCardComponent from './AddressCardComponent.vue';

const customer = getCustomer();
const { shipAddress, billAddress, otherAddress } = getAddress(customer);
</script>

<template>
  <v-row>
    <v-col class="text-left">
      <h2>Address Book</h2>
      <p>Edit your delivery and billing address.</p>
      <v-btn class="mt-6" variant="tonal">Add New Address</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-left">
      <h2>Default Addresses</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col sm="7" md="6">
      <AddressCardComponent :address="shipAddress" type="shipping" />
    </v-col>
    <v-col sm="7" md="6">
      <AddressCardComponent :address="billAddress" type="billing" />
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-left">
      <h2>Other Addresses</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <template v-if="otherAddress.length === 0">
        <AddressCardComponent :address="undefined" type="saved" />
      </template>
      <template v-else v-for="address in otherAddress" :key="address.id">
        <AddressCardComponent :address="address" type="saved" />
      </template>
    </v-col>
  </v-row>
</template>
<style scoped></style>
