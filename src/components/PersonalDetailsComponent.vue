<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { getCustomer } from '../services/customer-service';
import { schemaPersonal, type PersonalData } from '../utils/registration-schema';

import { getFieldRules } from '../utils/user-profile';

const isPersonal = ref(false);
const form = ref();
const menu = ref(false);
const { firstName, lastName, dateOfBirth, email } = getCustomer();

const formData = reactive<PersonalData>({
  firstName: firstName || '',
  lastName: lastName || '',
  email: email || '',
  dateOfBirth: new Date(dateOfBirth || ''),
});

const getFieldRulesForm = (fieldName: keyof PersonalData) => getFieldRules(fieldName, schemaPersonal);

const formattedDate = computed(() => {
  return formData.dateOfBirth ? new Intl.DateTimeFormat().format(new Date(formData.dateOfBirth)) : '';
});

const register = async () => {
  const result = schemaPersonal.safeParse(formData).success;
  if (result) {
    console.log(formData);
  }
};

const clear = () => {
  isPersonal.value = !isPersonal.value;
};
</script>

<template>
  <template v-if="isPersonal">
    <v-row justify="start">
      <v-col>
        <v-card max-width="400" min-width="260" width="100%" class="text-left" variant="text">
          <v-card-title>Personal Details</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="register" name="registrationForm">
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
        <h2>Login & Security</h2>
        <p>Edit your name, email and your password.</p>
      </v-col>
      <v-divider />
    </v-row>
    <v-row>
      <v-col>
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
        <v-btn text="Change" variant="tonal" @click="isPersonal = !isPersonal" />
      </v-col>
      <v-divider />
    </v-row>
    <v-row>
      <v-col>
        <v-card variant="text" class="text-left" title="Your Password">
          <v-card-text class="ml-5">*********</v-card-text>
        </v-card>
      </v-col>
      <v-col align-self="center">
        <v-btn text="Change" variant="tonal" />
      </v-col>
    </v-row>
  </template>
</template>

<style scoped></style>
