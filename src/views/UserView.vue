<script setup lang="ts">
import { computed, ref } from 'vue';
import AddressBookComponent from '../components/AddressBookComponent.vue';
import PersonalDetailsComponent from '../components/PersonalDetailsComponent.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
const activeTab = ref('personalDetails');

const tabDirection = computed(() => (mobile.value ? 'horizontal' : 'vertical'));
const tabClasses = computed(() => (mobile.value ? 'd-flex flex-column ga-4' : 'd-flex flex-row ga-10'));
</script>

<template>
  <v-card variant="text">
    <v-toolbar color="red-secondary" title="User Profile"> </v-toolbar>

    <div :class="tabClasses">
      <v-tabs v-model="activeTab" color="primary" :direction="tabDirection">
        <v-tab prepend-icon="mdi-map-marker" class="text-none" text="Address Book" value="addressBook"></v-tab>
        <v-tab prepend-icon="mdi-account" class="text-none" text="Personal Data" value="personalDetails"></v-tab>
      </v-tabs>

      <v-tabs-window v-model="activeTab" class="w-100">
        <v-tabs-window-item value="addressBook">
          <AddressBookComponent />
        </v-tabs-window-item>
        <v-tabs-window-item value="personalDetails">
          <PersonalDetailsComponent />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-card>
</template>
<style scoped></style>
