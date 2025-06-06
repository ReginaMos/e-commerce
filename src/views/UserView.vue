<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import { Links } from '../constants/routersLinks';
import type { BreadcrumbItem } from 'vuetify/lib/components/VBreadcrumbs/VBreadcrumbs.mjs';
import BreadCrumbsComponent from '../components/BreadCrumbsComponent.vue';
import { refreshCustomerData } from '../services/customer-service';

const { mobile } = useDisplay();
const router = useRouter();
const route = useRoute();

const tabItems = [
  { label: Links.ADDRESS.NAME, value: Links.ADDRESS.LINK },
  { label: Links.PERSONAL.NAME, value: Links.PERSONAL.LINK },
];

const activeTab = ref(route.path);

const items = computed<BreadcrumbItem[]>(() => [
  {
    title: Links.HOME.NAME,
    disabled: false,
    to: Links.HOME.LINK,
  },
  {
    title: Links.USER.NAME,
    disabled: true,
    to: Links.USER.LINK,
  },
]);

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

onMounted(async () => {
  try {
    await refreshCustomerData();
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err.message, 'error');
    }
    router.push(Links.LOGIN.LINK);
  }
});

function onTabChange(newTab: unknown) {
  if (typeof newTab === 'string' && newTab !== route.path) {
    router.push(newTab);
  }
}

const tabDirection = computed(() => (mobile.value ? 'horizontal' : 'vertical'));
const tabClasses = computed(() => (mobile.value ? 'd-flex flex-column ga-4' : 'd-flex flex-row ga-10'));
</script>

<template>
  <BreadCrumbsComponent :items="items" />
  <v-card variant="text" class="mt-16">
    <div :class="tabClasses">
      <v-tabs v-model="activeTab" :direction="tabDirection" @update:model-value="onTabChange">
        <v-tab v-for="item in tabItems" :key="item.value" :value="item.value" class="text-none">
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-window class="w-100">
        <router-view />
      </v-tabs-window>
    </div>
  </v-card>
</template>
<style scoped></style>
