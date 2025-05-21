<script setup lang="ts">
import { ref, reactive, computed, type ComputedRef, inject } from 'vue';
import { z, type AnyZodObject } from 'zod';
import { loginSchema } from '../utils/login-schema.ts';

import type { MyCustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/me';
import { useAuth } from '../services/customer-service.ts';

import { Links } from '../constants/routersLinks.ts';
import { RouterLink, useRouter } from 'vue-router';

const { loginCustomer } = useAuth();
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
      .catch((err: unknown) => {
        if (err instanceof Error) {
          toaster?.show(err.message, 'error');
        }
      });
  }
};
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card max-width="500" min-width="260" width="100%">
        <v-card-title class="mt-7 mx-sm-7 mt-sm-7 form-title">Login to Vue Magic Time</v-card-title>
        <v-card-subtitle class="">Enter your details below</v-card-subtitle>
        <v-card-text class="mx-sm-7 mb-sm-7">
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
            <v-btn class="submit-button mb-5" type="submit" :disabled="!form" block> Login </v-btn>
          </v-form>
          <RouterLink :to="Links.SIGNUP.LINK" class="form-link">New user? <span>Sign Up</span></RouterLink>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.form-title {
  @media screen and (min-width: 576px) {
    font-size: 24px;
  }
}
.submit-button {
  color: var(--white-text);
  background-color: var(--red-secondary);
  min-width: 150px;
  margin: 0 auto;
  margin-top: 20px;
}
.form-link {
  span {
    text-decoration: underline;
  }
  &:hover {
    color: var(--red-secondary);
    text-decoration: underline;
  }
}
</style>
