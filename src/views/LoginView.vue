<script setup lang="ts">
import { ref, reactive, computed, type ComputedRef, inject } from 'vue';
import { z, type AnyZodObject } from 'zod';
import { loginSchema } from '../utils/login-schema.ts';

import type { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { loginCustomer } from '../services/login-customer.ts';

type FormData = z.infer<typeof loginSchema>;

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

const formData = reactive<FormData>({
  email: '',
  password: '',
});

const form = ref(false);

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

const getFieldRulesForm = (fieldName: keyof FormData) => getFieldRules(fieldName, loginSchema);

const login = async () => {
  const resultForm = loginSchema.safeParse(formData);

  if (resultForm.success) {
    const customer: MyCustomerDraft = {
      ...formData,
    };

    await loginCustomer(customer)
      .then(() => {
        toaster?.show('Customer created!', 'success');
      })
      .catch((err) => {
        if (err instanceof Error) {
          toaster?.show(err.message, 'error');
        }
      });
  }
};
</script>

<template>
  <v-container class="container login-wrapper">
    <v-row>
      <v-img class="login-img" width="805" height="781" src="/images/loginImg.png" alt="login" cover></v-img>
    </v-row>
    <v-row justify="center">
      <v-card width="371" height="326">
        <v-card-title>Login to Vue Magic Time</v-card-title>
        <v-card-text>
          <p>Enter your details below</p>
          <v-form v-model="form" @submit.prevent="login">
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
            <v-btn color="primary" type="submit" :disabled="!form"> Login </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-wrapper {
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 1440px;
  height: 981px;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 129px;
}
.login-wrapper .login-img {
  padding: 0;
  margin: 0;
  display: block;

  width: 805px;
  height: 781px;
}
.login-wrapper .v-row {
  margin: 0;
}
</style>
