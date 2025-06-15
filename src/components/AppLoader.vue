<script setup lang="ts">
import { ref } from 'vue';
import { initializeCart } from '../services/carts-service';

const loading = ref(true);
const error = ref<string | null>(null);

async function initialize() {
  try {
    loading.value = true;
    error.value = null;
    await initializeCart();
  } catch (e) {
    error.value = 'Failed to initialize application';
    console.error(e);
  } finally {
    loading.value = false;
  }
}

const retry = () => initialize();

initialize();
</script>

<template>
  <div v-if="error" class="error">
    {{ error }}
    <button @click="retry">Retry</button>
  </div>
  <div v-else-if="loading" class="loading">Loading...</div>
  <slot v-else></slot>
</template>
