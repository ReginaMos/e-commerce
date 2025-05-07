<script setup lang="ts">
import { ref, reactive, computed, type ComputedRef } from 'vue';
import { z, type AnyZodObject } from 'zod';
import { countyList } from '../utils/country-list';
import { addressSchema, registrationSchema, thirteenYearsAgo } from '../utils/registration-schema';
import { createCustomer } from '../services/create-customer';
import type { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { formatDateISO8601 } from '../utils/format-date';

type FormData = z.infer<typeof registrationSchema>;
type AddressData = z.infer<typeof addressSchema>;

const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: thirteenYearsAgo,
});
const addressData = reactive<AddressData>({
  city: '',
  country: '',
  postalCode: '',
  streetName: '',
});

const form = ref(false);
const menu = ref(false);
const countries = ref(countyList);

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
  return new Intl.DateTimeFormat().format(new Date(formData.dateOfBirth));
});

const register = async () => {
  const resultForm = registrationSchema.safeParse(formData);
  const resultAddress = addressSchema.safeParse(addressData);

  if (resultForm.success && resultAddress.success) {
    const customer: MyCustomerDraft = {
      ...formData,
      dateOfBirth: formatDateISO8601(formData.dateOfBirth),
      addresses: [addressData],
    };
    console.log(customer);
    await createCustomer(customer);
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card width="380">
        <v-card-title>Sign Up Form</v-card-title>
        <v-card-text>
          <v-form v-model="form" @submit.prevent="register">
            <v-text-field
              v-model="formData.firstName"
              :rules="getFieldRulesForm('firstName').value"
              label="Fist Name"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.lastName"
              :rules="getFieldRulesForm('lastName').value"
              label="Last Name"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="getFieldRulesForm('email').value"
              label="Email"
              type="email"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="getFieldRulesForm('password').value"
              label="Password"
              type="password"
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
                  v-bind="props"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData.dateOfBirth" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-card-title class="text-start">Billing Address</v-card-title>
            <v-text-field
              v-model="addressData.streetName"
              :rules="getFieldRulesAddress('streetName').value"
              label="Street"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="addressData.city"
              :rules="getFieldRulesAddress('city').value"
              label="City"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="addressData.postalCode"
              :rules="getFieldRulesAddress('postalCode').value"
              label="Postal Code"
              variant="underlined"
              required
            ></v-text-field>

            <v-autocomplete
              v-model="addressData.country"
              :items="countries"
              item-title="name"
              item-value="code"
              label="Country"
              variant="underlined"
              :rules="getFieldRulesAddress('country').value"
              required
            ></v-autocomplete>
            <v-btn color="primary" type="submit" :disabled="!form"> Sign up </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped></style>
