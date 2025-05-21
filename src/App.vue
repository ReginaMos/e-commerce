<script setup lang="ts">
import { ref, provide } from 'vue';
import type ToasterComponent from './components/ToasterComponent.vue';

const toaster = ref<InstanceType<typeof ToasterComponent> | null>(null);

const showToasterFn = (message: string, color?: string, timeout?: number) => {
  toaster.value?.showToaster(message, color, timeout);
};

provide('toaster', { show: showToasterFn });
</script>

<template>
  <router-view />
  <universal-toaster ref="toaster" />
</template>

<style scoped></style>
