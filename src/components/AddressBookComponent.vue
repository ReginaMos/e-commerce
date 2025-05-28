<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue';
import { addCustomerAddress, getCustomer } from '../services/customer-service';
import { getAddress, getFieldRules } from '../utils/user-profile';
import AddressCardComponent from './AddressCardComponent.vue';
import { addressSchema, type AddressData } from '../utils/registration-schema';
import { countyList } from '../constants/country-list';

type ModifyActions = 'edit' | 'remove' | 'add' | 'none';

const modifyActions = ref<ModifyActions>('none');
const isLoading = ref(false);
const isOnEdit = ref(false);
const customer = ref(getCustomer());

const addresses = computed(() => getAddress(customer.value));

const addressForm = ref();
const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

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
  isLoading.value = true;
  const result = addressSchema.safeParse(address).success;
  if (result) {
    switch (modifyActions.value) {
      case 'add':
        await addCustomerAddress(address, defaultShipping.value, defaultBilling.value)
          .then(() => {
            toaster?.show('New Address added', 'success');
            customer.value = getCustomer();
          })
          .catch((err: unknown) => {
            if (err instanceof Error) {
              toaster?.show(err.message, 'error');
            }
          })
          .finally(() => (isLoading.value = false));
        break;

      default:
        break;
    }
  } else {
    toaster?.show('Fill in required fields!', 'error');
  }
};

const cancel = () => {
  addressForm.value?.reset();
  isOnEdit.value = !isOnEdit.value;
  modifyActions.value = 'none';
};

const setNewAddress = () => {
  modifyActions.value = 'add';
  isOnEdit.value = !isOnEdit.value;
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
              <v-checkbox
                v-model="defaultBilling"
                label="Set as default billing"
                hide-details
                class="mb-4"
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
      <v-col sm="7" md="6">
        <AddressCardComponent :address="addresses.shipAddress" type="shipping" />
      </v-col>
      <v-col sm="7" md="6">
        <AddressCardComponent :address="addresses.billAddress" type="billing" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-left">
        <h2>Other Addresses</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template v-if="addresses.otherAddress.length === 0">
          <AddressCardComponent :address="undefined" type="saved" />
        </template>
        <template v-else v-for="address in addresses.otherAddress" :key="address.id">
          <AddressCardComponent :address="address" type="saved" />
        </template>
      </v-col>
    </v-row>
  </template>
</template>
<style scoped></style>
