<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { z } from 'zod';
import { countyList } from '../utils/country-list';
import { registrationSchema, thirteenYearsAgo } from '../utils/registration-schema';

type FormData = z.infer<typeof registrationSchema>;

const formData = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dateOfBirth: thirteenYearsAgo,
  street: '',
  city: '',
  postalCode: '',
  country: '',
});

const form = ref(false);
const menu = ref(false);
const countries = ref(countyList);

const getFieldRules = (fieldName: keyof FormData) => {
  return computed(() => [
    (v: string) => {
      const result = registrationSchema.shape[fieldName].safeParse(v);
      return result.success ? true : result.error.issues[0].message;
    },
  ]);
};

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat().format(formData.dateOfBirth);
});

const register = async () => {
  const result = registrationSchema.safeParse(formData);

  if (result.success) {
    console.log('Registration data:', formData);
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
              :rules="getFieldRules('firstName').value"
              label="Username"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.lastName"
              :rules="getFieldRules('lastName').value"
              label="Username"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              :rules="getFieldRules('email').value"
              label="Email"
              type="email"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :rules="getFieldRules('password').value"
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
                  :value="formattedDate"
                  label="Date of Birth"
                  prepend-icon="mdi-calendar"
                  variant="underlined"
                  v-bind="props"
                  :rules="getFieldRules('dateOfBirth').value"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="formData.dateOfBirth" @input="menu = false"></v-date-picker>
            </v-menu>
            <v-card-title class="text-start">Billing Address</v-card-title>
            <v-text-field
              v-model="formData.street"
              :rules="getFieldRules('street').value"
              label="Street"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.city"
              :rules="getFieldRules('city').value"
              label="City"
              variant="underlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.postalCode"
              :rules="getFieldRules('postalCode').value"
              label="Postal Code"
              variant="underlined"
              required
            ></v-text-field>

            <v-autocomplete
              v-model="formData.country"
              :items="countries"
              label="Country"
              variant="underlined"
              :rules="getFieldRules('country').value"
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
