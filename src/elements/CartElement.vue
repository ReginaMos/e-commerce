<script setup lang="ts">
interface Props {
  image: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

const min = 1;
const max = 99;

defineProps<Props>();
const emit = defineEmits<{
  (e: 'remove'): void;
}>();
</script>

<template>
  <v-card class="d-flex align-center pa-4 mb-4" variant="elevated">
    <v-img :src="image" width="100" height="100" cover class="rounded"></v-img>
    <v-card-title class="pa-0">{{ name }}</v-card-title>
    <v-card-text class="pa-0 text-body-1"> ${{ price.toFixed(2) }}</v-card-text>

    <v-number-input
      max-width="80"
      :model-value="quantity"
      :min="min"
      :max="max"
      controlVariant="stacked"
      inset
      variant="outlined"
      hide-details
    ></v-number-input>

    <v-card-text class="pa-0 text-body-1"> ${{ subtotal.toFixed(2) }}</v-card-text>
    <v-btn class="pa-0" color="error" variant="text" @click="emit('remove')" icon="mdi-delete"></v-btn>
  </v-card>
</template>

<style scoped></style>
