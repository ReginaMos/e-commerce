<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getCustomer } from '../services/customer-service';
import { getAddress, getFieldRules } from '../utils/user-profile';
import AddressCardComponent from './AddressCardComponent.vue';
import { addressSchema, type AddressData } from '../utils/registration-schema';
import { countyList } from '../constants/country-list';

const isNewAddress = ref(false);
const customer = getCustomer();
const { shipAddress, billAddress, otherAddress } = getAddress(customer);
const addressForm = ref();

const address = reactive<AddressData>({
  city: '',
  country: '',
  postalCode: '',
  streetName: '',
});

const defaultBilling = ref(false);
const defaultShipping = ref(false);

const getFieldRulesAddress = (fieldName: keyof AddressData) => getFieldRules(fieldName, addressSchema);

const register = async () => {
  const result = addressSchema.safeParse(address).success;
  if (result) {
    console.log(address);
  }
};

const clear = () => {
  addressForm.value?.reset();
  isNewAddress.value = !isNewAddress.value;
};
</script>

<template>
  <template v-if="isNewAddress">
    <v-row justify="start">
      <v-col>
        <v-card
          max-width="400"
          min-width="260"
          width="100%"
          title="Add a New Address"
          subtitle="All fields required"
          variant="text"
          class="text-left"
        >
          <v-card-text>
            <v-form ref="addressForm" @submit.prevent="register" class="mb-2" name="registrationForm">
              <v-text-field
                v-model="address.streetName"
                :rules="getFieldRulesAddress('streetName').value"
                label="Street"
                name="shippingStreet"
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="address.city"
                :rules="getFieldRulesAddress('city').value"
                label="City"
                name="shippingCity"
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="address.postalCode"
                :rules="getFieldRulesAddress('postalCode').value"
                label="Postal Code"
                name="shippingPostalCode"
                variant="underlined"
              ></v-text-field>

              <v-autocomplete
                v-model="address.country"
                :items="countyList"
                item-title="name"
                item-value="code"
                label="Country"
                name="shippingCountry"
                variant="underlined"
                :rules="getFieldRulesAddress('country').value"
                required
              ></v-autocomplete>
              <v-checkbox v-model="defaultShipping" label="Set as default shipping" hide-details></v-checkbox>
              <v-checkbox v-model="defaultBilling" label="Set as default billing" hide-details></v-checkbox>
              <v-btn type="submit" text="Save Address" color="black" variant="elevated" class="me-4" />
              <v-btn type="reset" text="Cancel" color="black" variant="outlined" @click="clear" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <template v-else>
    <v-row>
      <v-col class="text-left">
        <h2>Address Book</h2>
        <p>Edit your delivery and billing address.</p>
        <v-btn class="mt-6" @click="isNewAddress = !isNewAddress" variant="tonal">Add New Address</v-btn>
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
</template>
<style scoped></style>
