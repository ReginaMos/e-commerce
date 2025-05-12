<script setup lang="ts">
import { ref, reactive, computed, type ComputedRef, inject } from 'vue';
import { z, type AnyZodObject } from 'zod';
import { countyList } from '../constants/country-list';
import { addressSchema, registrationSchema, thirteenYearsAgo } from '../utils/registration-schema';
import type { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { formatDateISO8601 } from '../utils/format-date';
import { useRouter } from 'vue-router';
import { createCustomer } from '../services/create-customer';
import { Links } from '../constants/routersLinks';

type FormData = z.infer<typeof registrationSchema>;
type AddressData = z.infer<typeof addressSchema>;

const router = useRouter();
const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: thirteenYearsAgo,
});
const billingAddress = reactive<AddressData>({
  city: '',
  country: '',
  postalCode: '',
  streetName: '',
});
const shippingAddress = reactive<AddressData>({
  city: '',
  country: '',
  postalCode: '',
  streetName: '',
});

const menu = ref(false);
const sameAddress = ref(true);
const defaultBilling = ref(false);
const defaultShipping = ref(false);

const getFieldRules = <T extends object>(
  fieldName: keyof T,
  schema: AnyZodObject
): ComputedRef<((v: string) => true | string)[]> => {
  return computed(() => [
    (v: string) => {
      const result = schema.shape[fieldName].safeParse(v);
      return result.success ? true : result.error.issues[0].message;
    },
  ]);
};

const getFieldRulesForm = (fieldName: keyof FormData) => getFieldRules(fieldName, registrationSchema);
const getFieldRulesAddress = (fieldName: keyof AddressData) => getFieldRules(fieldName, addressSchema);

const formattedDate = computed(() => {
  return formData.dateOfBirth ? new Intl.DateTimeFormat().format(new Date(formData.dateOfBirth)) : '';
});

const register = async () => {
  const resultForm = registrationSchema.safeParse(formData).success;
  const resultBilling = addressSchema.safeParse(billingAddress).success;
  const dateOfBirth = formData.dateOfBirth && formatDateISO8601(formData.dateOfBirth);
  const resultShipping = sameAddress.value ? true : addressSchema.safeParse(shippingAddress).success;
  const addresses = [billingAddress];
  if (!sameAddress.value) addresses.push(shippingAddress);

  const defaultShippingAddress = sameAddress.value && defaultBilling.value ? 0 : defaultShipping.value ? 1 : undefined;

  if (resultForm && resultBilling && resultShipping) {
    const customer: MyCustomerDraft = {
      ...formData,
      dateOfBirth,
      addresses,
      defaultBillingAddress: defaultBilling.value ? 0 : undefined,
      defaultShippingAddress,
    };

    await createCustomer(customer)
      .then(() => {
        toaster?.show('Customer created!', 'success');
        router.push(Links.HOME.LINK);
      })
      .catch((err) => {
        if (err instanceof Error) {
          toaster?.show(err.message, 'error');
        }
      });
  } else {
    toaster?.show('Fill in required fields!', 'error');
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center" col>
      <v-card>
        <v-card-title>Sign Up Form</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="register" class="mb-2">
            <v-text-field
              v-model="formData.firstName"
              :rules="getFieldRulesForm('firstName').value"
              label="Fist Name"
              variant="underlined"
              name="firstName"
            ></v-text-field>

            <v-text-field
              v-model="formData.lastName"
              :rules="getFieldRulesForm('lastName').value"
              label="Last Name"
              name="lastName"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="getFieldRulesForm('email').value"
              label="Email"
              type="email"
              name="email"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="getFieldRulesForm('password').value"
              label="Password"
              type="password"
              name="password"
              variant="underlined"
              required
            ></v-text-field>

            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formData.dateOfBirth"
                  :rules="getFieldRulesForm('dateOfBirth').value"
                  :value="formattedDate"
                  label="Date of Birth"
                  prepend-icon="mdi-calendar"
                  variant="underlined"
                  name="dateOfBirth"
                  v-bind="props"
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData.dateOfBirth" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-checkbox v-model="sameAddress" label="Same address for billing and shipping"></v-checkbox>
            <v-card-title class="text-start">Billing Address</v-card-title>
            <v-text-field
              v-model="billingAddress.streetName"
              :rules="getFieldRulesAddress('streetName').value"
              label="Street"
              variant="underlined"
              name="billingStreetName"
            ></v-text-field>

            <v-text-field
              v-model="billingAddress.city"
              :rules="getFieldRulesAddress('city').value"
              label="City"
              name="billingCity"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="billingAddress.postalCode"
              :rules="getFieldRulesAddress('postalCode').value"
              label="Postal Code"
              name="billingPostalCode"
              variant="underlined"
            ></v-text-field>

            <v-autocomplete
              v-model="billingAddress.country"
              :items="countyList"
              item-title="name"
              item-value="code"
              label="Country"
              name="billingCountry"
              variant="underlined"
              :rules="getFieldRulesAddress('country').value"
              required
            ></v-autocomplete>
            <v-checkbox
              v-model="defaultBilling"
              :label="sameAddress ? 'Set as default shipping and billing address' : 'Set as default billing address'"
            ></v-checkbox>
            <template v-if="!sameAddress">
              <v-card-title class="text-start">Shipping Address</v-card-title>
              <v-text-field
                v-model="shippingAddress.streetName"
                :rules="getFieldRulesAddress('streetName').value"
                label="Street"
                name="shippingStreet"
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="shippingAddress.city"
                :rules="getFieldRulesAddress('city').value"
                label="City"
                name="shippingCity"
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="shippingAddress.postalCode"
                :rules="getFieldRulesAddress('postalCode').value"
                label="Postal Code"
                name="shippingPostalCode"
                variant="underlined"
              ></v-text-field>

              <v-autocomplete
                v-model="shippingAddress.country"
                :items="countyList"
                item-title="name"
                item-value="code"
                label="Country"
                name="shippingCountry"
                variant="underlined"
                :rules="getFieldRulesAddress('country').value"
                required
              ></v-autocomplete>
              <v-checkbox v-model="defaultShipping" label="Set as default shipping"></v-checkbox>
            </template>
            <v-btn color="primary" type="submit" block> Sign up </v-btn>
          </v-form>
          <span>Already have account?</span>
          <v-btn :to="Links.LOGIN.LINK" text="Login" variant="text"></v-btn>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped></style>
