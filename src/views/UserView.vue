<script setup lang="ts">
import { ref } from 'vue';
import AddressBookComponent from '../components/AddressBookComponent.vue';
import PersonalDetailsComponent from '../components/PersonalDetailsComponent.vue';

const tab = ref('addressBook');
</script>

<template>
  <v-card>
    <v-toolbar color="primary" title="User Profile"> </v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs v-model="tab" color="primary" direction="vertical">
        <v-tab prepend-icon="mdi-map-marker" text="Address Book" value="addressBook"></v-tab>
        <v-tab prepend-icon="mdi-account" text="Personal Data" value="personalDetails"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="addressBook">
          <v-card flat>
            <AddressBookComponent />
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="personalDetails">
          <v-card flat>
            <PersonalDetailsComponent />
          </v-card>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<style scoped></style>
