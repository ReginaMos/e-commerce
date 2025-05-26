<script setup lang="ts">
import { getCustomer } from '../services/customer-service';

const { firstName, lastName, dateOfBirth, email } = getCustomer();
</script>

<template>
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
      <v-btn text="Change" variant="tonal" />
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

<style scoped></style>
