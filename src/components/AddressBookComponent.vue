<script setup lang="ts">
import { computed, inject, nextTick, reactive, ref } from 'vue';
import {
  addCustomerAddress,
  getCustomer,
  removeCustomerAddress,
  updateCustomerAddress,
} from '../services/customer-service';
import { getAddress, getFieldRules } from '../utils/user-profile';
import AddressCardComponent from './AddressCardComponent.vue';
import { addressSchema, type AddressData } from '../utils/registration-schema';
import { countyList } from '../constants/country-list';
import type { MessageType } from '../models/models';
import type { VCheckbox } from 'vuetify/components';

type ModifyActions = 'edit' | 'remove' | 'add' | 'none';

const isOnEdit = ref(false);
const isLoading = ref(false);
const addressForm = ref();
const customer = ref(getCustomer());
const modifyActions = ref<ModifyActions>('none');
const addressIdEdit = ref('');

const addresses = computed(() => getAddress(customer.value));

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

const address = reactive<AddressData>({
  city: '',
  country: '',
  postalCode: '',
  streetName: '',
});

const defaultBilling = ref(false);
const defaultShipping = ref(false);
const billingDisabled = ref(false);
const shippingDisabled = ref(false);

const getFieldRulesAddress = (fieldName: keyof AddressData) => getFieldRules(fieldName, addressSchema);

const register = async () => {
  isLoading.value = true;
  const result = addressSchema.safeParse(address).success;
  if (result) {
    switch (modifyActions.value) {
      case 'add':
        await addCustomerAddress(customer.value, address, defaultShipping.value, defaultBilling.value)
          .then(() => {
            toaster?.show('New Address added', 'success');
            customer.value = getCustomer();
            isLoading.value = false;
            cancel();
          })
          .catch((err: unknown) => {
            if (err instanceof Error) {
              toaster?.show(err.message, 'error');
              isLoading.value = false;
            }
          });
        break;
      case 'edit':
        await updateCustomerAddress(
          customer.value,
          addressIdEdit.value,
          address,
          defaultShipping.value,
          defaultBilling.value
        )
          .then(() => {
            toaster?.show('Address changed', 'success');
            customer.value = getCustomer();
            isLoading.value = false;
            cancel();
          })
          .catch((err: unknown) => {
            if (err instanceof Error) {
              toaster?.show(err.message, 'error');
              isLoading.value = false;
            }
          });
        break;
    }
  } else {
    toaster?.show('Fill in required fields!', 'error');
  }
};

const handleRemoveAddress = async (addressId: string) => {
  isLoading.value = true;
  try {
    await removeCustomerAddress(customer.value, addressId);
    toaster?.show('Address removed', 'success');
    customer.value = getCustomer();
    isLoading.value = false;
    isOnEdit.value = !isOnEdit.value;
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err.message, 'error');
      isLoading.value = false;
    }
  }
};

const cancel = () => {
  addressForm.value?.reset();
  isOnEdit.value = !isOnEdit.value;
  modifyActions.value = 'none';
  defaultBilling.value = false;
  billingDisabled.value = false;
};

const setNewAddress = (type?: MessageType) => {
  modifyActions.value = 'add';
  isOnEdit.value = !isOnEdit.value;
  if (type === 'billing') {
    defaultBilling.value = true;
    billingDisabled.value = true;
  }
  if (type === 'shipping') {
    defaultShipping.value = true;
    shippingDisabled.value = true;
  }
};

const editAddress = (addressId: string) => {
  const findAddress = customer.value.addresses.find((add) => add.id === addressId);
  if (!findAddress) return;
  addressIdEdit.value = addressId;
  modifyActions.value = 'edit';
  isOnEdit.value = !isOnEdit.value;
  address.city = findAddress.city || '';
  address.country = findAddress.country || '';
  address.streetName = findAddress.streetName || '';
  address.postalCode = findAddress.postalCode || '';
  defaultBilling.value = customer.value.defaultBillingAddressId === findAddress.id;
  defaultShipping.value = customer.value.defaultShippingAddressId === findAddress.id;

  nextTick(() => {
    addressForm.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
};
</script>

<template>
  <template v-if="isOnEdit">
    <v-row justify="start">
      <v-col>
        <v-card
          max-width="400"
          min-width="260"
          width="100%"
          :title="modifyActions === 'add' ? 'Add a New Address' : 'Edit Address'"
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
              <v-checkbox
                v-model="defaultShipping"
                label="Set as default shipping"
                hide-details
                :disabled="shippingDisabled"
              ></v-checkbox>
              <v-checkbox
                v-model="defaultBilling"
                label="Set as default billing"
                :disabled="billingDisabled"
              ></v-checkbox>
              <v-btn
                type="submit"
                text="Save Address"
                color="black"
                variant="elevated"
                class="me-4"
                :loading="isLoading"
              />
              <v-btn type="reset" text="Cancel" color="black" variant="outlined" @click="cancel" />
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
        <v-btn class="mt-6" @click="setNewAddress" variant="tonal">Add New Address</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <h2>Default Addresses</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <AddressCardComponent
          :address="addresses.shipAddress"
          type="shipping"
          @remove="handleRemoveAddress"
          @edit="editAddress"
          @add="setNewAddress"
        />
      </v-col>
      <v-col cols="12" md="6">
        <AddressCardComponent
          :address="addresses.billAddress"
          type="billing"
          @remove="handleRemoveAddress"
          @edit="editAddress"
          @add="setNewAddress"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <h2>Other Addresses</h2>
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <template v-if="addresses.otherAddress.length === 0">
        <v-col>
          <AddressCardComponent :address="undefined" type="other" @click="setNewAddress" />
        </v-col>
      </template>
      <template v-else v-for="address in addresses.otherAddress" :key="address.id">
        <v-col cols="12" md="6">
          <AddressCardComponent :address="address" type="saved" @remove="handleRemoveAddress" @edit="editAddress" />
        </v-col>
      </template>
    </v-row>
  </template>
</template>
<style scoped></style>
