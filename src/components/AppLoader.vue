<script setup lang="ts">
import { ref } from 'vue';
import { getActiveCart } from '../services/carts-service';

const loading = ref(true);

async function initialize() {
  try {
    loading.value = true;
    await getActiveCart();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

initialize();
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>
  <slot v-else></slot>
</template>
