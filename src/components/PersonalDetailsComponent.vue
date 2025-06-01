<script setup lang="ts">
import { computed, inject, reactive, ref } from 'vue';
import { getCustomer, updateCustomerPassword, updateCustomerPersonal } from '../services/customer-service';
import {
  schemaPersonal,
  schemaUpdatePassword,
  type PersonalData,
  type UpdatePasswordData,
} from '../utils/registration-schema';

import { getFieldRules } from '../utils/user-profile';

const isOpenedInfo = ref(false);
const isOpenedPass = ref(false);
const isLoading = ref(false);
const visibleOld = ref(false);
const visibleNew = ref(false);
const menu = ref(false);

const { firstName, lastName, dateOfBirth, email } = getCustomer();

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

const formData = reactive<PersonalData>({
  firstName: firstName || '',
  lastName: lastName || '',
  email: email || '',
  dateOfBirth: new Date(dateOfBirth || ''),
});

const passData = reactive<UpdatePasswordData>({ oldPassword: '', newPassword: '' });

const getFieldRulesForm = (fieldName: keyof PersonalData) => getFieldRules(fieldName, schemaPersonal);
const getFieldRulesPass = (fieldName: keyof UpdatePasswordData) => getFieldRules(fieldName, schemaUpdatePassword);

const formattedDate = computed(() => {
  return formData.dateOfBirth ? new Intl.DateTimeFormat().format(new Date(formData.dateOfBirth)) : '';
});

const register = async () => {
  const isValid = schemaPersonal.safeParse(formData).success;
  if (isValid) {
    isLoading.value = true;

    await updateCustomerPersonal({ firstName, lastName, dateOfBirth: new Date(dateOfBirth || ''), email }, formData)
      .then(() => {
        toaster?.show('Personal info updated!', 'success');
        isLoading.value = false;
        clear();
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          toaster?.show(err.message, 'error');
          isLoading.value = false;
        }
      });
  } else {
    toaster?.show('Fill in required fields!', 'error');
  }
};

const clear = () => {
  formData.firstName = firstName || '';
  formData.lastName = lastName || '';
  formData.email = email || '';
  formData.dateOfBirth = new Date(dateOfBirth || '');
  isOpenedInfo.value = !isOpenedInfo.value;
};

const clearPass = () => {
  passData.oldPassword = '';
  passData.newPassword = '';
  isOpenedPass.value = !isOpenedPass.value;
};

const updatePass = async () => {
  const isValid = schemaUpdatePassword.safeParse(passData).success;
  if (isValid) {
    isLoading.value = true;

    await updateCustomerPassword(passData)
      .then(() => {
        toaster?.show('Password updated!', 'success');
        isLoading.value = false;
        clearPass();
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          toaster?.show(err.message, 'error');
          isLoading.value = false;
        }
      });
  } else {
    toaster?.show('Check validation errors!', 'error');
  }
};
</script>

<template>
  <template v-if="isOpenedInfo">
    <v-row justify="start">
      <v-col>
        <v-card max-width="400" min-width="260" width="100%" class="text-left" variant="text">
          <v-card-title>Personal Details</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register" name="personalForm">
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

              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    class="mb-4"
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
                <v-date-picker v-model="formData.dateOfBirth" name="dateOfBirth" @input="menu = false"></v-date-picker>
              </v-menu>
              <v-btn
                type="submit"
                text="Save Address"
                color="black"
                variant="elevated"
                class="me-4"
                :loading="isLoading"
              />
              <v-btn type="reset" text="Cancel" color="black" variant="outlined" @click="clear" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <template v-if="isOpenedPass">
    <v-row justify="start">
      <v-col>
        <v-card max-width="400" min-width="260" width="100%" class="text-left" variant="text">
          <v-card-title>Personal Details</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="updatePass" name="passwordForm">
              <v-text-field
                :append-inner-icon="visibleOld ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleOld ? 'text' : 'password'"
                :rules="getFieldRulesPass('oldPassword').value"
                v-model="passData.oldPassword"
                label="Current Password"
                variant="underlined"
                @click:append-inner="visibleOld = !visibleOld"
                required
              ></v-text-field>

              <v-text-field
                :append-inner-icon="visibleNew ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleNew ? 'text' : 'password'"
                :rules="getFieldRulesPass('newPassword').value"
                v-model="passData.newPassword"
                label="New Password"
                variant="underlined"
                @click:append-inner="visibleNew = !visibleNew"
                class="mb-4"
                required
              ></v-text-field>

              <v-btn
                type="submit"
                text="Change Password"
                color="black"
                variant="elevated"
                class="me-4"
                :loading="isLoading"
              />
              <v-btn type="reset" text="Cancel" color="black" variant="outlined" @click="clearPass" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <template v-if="!isOpenedInfo && !isOpenedPass">
    <v-row>
      <v-col class="text-left">
        <h2>Login & Security</h2>
        <p>Edit your name, email and your password.</p>
      </v-col>
      <v-divider />
    </v-row>
    <v-row>
      <v-col cols="10" sm="6">
        <v-card variant="text" class="text-left" title="Personal Details">
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-subtitle>First Name</v-list-item-subtitle>
                <v-list-item-title>{{ firstName }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>Last Name</v-list-item-subtitle>
                <v-list-item-title>{{ lastName }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>Date of Birth</v-list-item-subtitle>
                <v-list-item-title>{{ dateOfBirth }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
                <v-list-item-title>{{ email }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col align-self="center">
        <v-btn text="Change" variant="tonal" @click="isOpenedInfo = !isOpenedInfo" />
      </v-col>
      <v-divider />
    </v-row>
    <v-row>
      <v-col cols="10" sm="6">
        <v-card variant="text" class="text-left" title="Your Password">
          <v-card-text class="ml-5">*********</v-card-text>
        </v-card>
      </v-col>
      <v-col align-self="center">
        <v-btn text="Change" variant="tonal" @click="isOpenedPass = !isOpenedPass" />
      </v-col>
    </v-row>
  </template>
</template>

<style scoped></style>
