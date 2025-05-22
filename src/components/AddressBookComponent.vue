<script setup lang="ts"></script>

<template>
  <v-row>
    <v-col class="text-left">
      <h2>Address Book</h2>
      <p>Edit your delivery and billing address.</p>
      <v-btn class="mt-6" variant="tonal">Add New Address</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-left">
      <h2>Default Addresses</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card
        variant="outlined"
        prepend-icon="mdi-truck-delivery-outline"
        class="text-left"
        title="Default Delivery Address"
      >
        <template v-slot:actions>
          <v-btn text="Edit" variant="tonal" />
          <v-btn text="Remove" variant="tonal" />
        </template>
        <v-list density="compact">
          <v-list-item>
            <span>City:</span>
          </v-list-item>
          <v-list-item>
            <span>Postal Code:</span>
          </v-list-item>
          <v-list-item>
            <span>Street:</span>
          </v-list-item>
          <v-list-item>
            <span>Country:</span>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-left">
      <h2>Other Addresses</h2>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-left">
      <v-card variant="outlined" class="text-left" subtitle="Saved Address">
        <template v-slot:actions>
          <v-btn text="Edit" variant="tonal" />
          <v-btn text="Remove" variant="tonal" />
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped></style>
