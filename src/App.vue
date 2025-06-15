<script setup lang="ts">
import { ref, provide } from 'vue';
import type ToasterComponent from './components/ToasterComponent.vue';
import { useRoute } from 'vue-router';
import AppLoader from './components/AppLoader.vue';

const toaster = ref<InstanceType<typeof ToasterComponent> | null>(null);

const showToasterFn = (message: string, color?: string, timeout?: number) => {
  toaster.value?.showToaster(message, color, timeout);
};

provide('toaster', { show: showToasterFn });

const route = useRoute();
</script>

<template>
  <AppLoader>
    <router-view :key="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id" />
    <universal-toaster ref="toaster" />
  </AppLoader>
</template>

<style scoped></style>
