<script setup lang="ts">
import { ref, reactive, computed, type ComputedRef, inject } from 'vue';
import { z, type AnyZodObject } from 'zod';
import { loginSchema } from '../utils/login-schema.ts';

import type { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { loginCustomer } from '../services/customer-service.ts';

import { Links } from '../constants/routersLinks.ts';
import { useRouter } from 'vue-router';

type FormData = z.infer<typeof loginSchema>;

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');
const router = useRouter();

const formData = reactive<FormData>({
  email: '',
  password: '',
});

const form = ref(false);
const visible = ref(false);

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
        router.push(Links.HOME.LINK);
        toaster?.show('Customer is login in!', 'success');
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
  <v-container fluid>
    <v-row>
      <v-col md="7">
        <v-img min-width="340" src="/images/loginImg.png" alt="login"></v-img>
      </v-col>
      <v-col align-self="center" lg="4">
        <v-card>
          <v-card-title>Login to Vue Magic Time</v-card-title>
          <v-card-subtitle>Enter your details below</v-card-subtitle>
          <v-card-text>
            <v-form v-model="form" @submit.prevent="login" class="mb-2">
              <v-text-field
                v-model="formData.email"
                :rules="getFieldRulesForm('email').value"
                label="Email"
                type="email"
                variant="underlined"
                required
              ></v-text-field>

              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                :rules="getFieldRulesForm('password').value"
                v-model="formData.password"
                label="Password"
                variant="underlined"
                @click:append-inner="visible = !visible"
                required
              ></v-text-field>
              <v-btn color="primary" type="submit" :disabled="!form" block> Login </v-btn>
            </v-form>
            <span>New user?</span>
            <v-btn :to="Links.SIGNUP.LINK" text="Signup" variant="text"></v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
