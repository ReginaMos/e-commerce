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
  <v-card class="pa-4 mb-4 container" variant="elevated">
    <v-img :src="image" width="100" height="100" cover class="rounded"></v-img>
    <v-card-text class="pa-0 text-body-1">{{ name }}</v-card-text>
    <v-card-title class="pa-0 text-body-1"> ${{ price.toFixed(2) }}</v-card-title>
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
    <v-card-title class="pa-0 text-body-1"> ${{ subtotal.toFixed(2) }}</v-card-title>
    <v-btn class="pa-0" variant="text" @click="emit('remove')" icon="mdi-delete"></v-btn>
  </v-card>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 1fr;
  justify-items: center;
  align-items: center;
  row-gap: 2rem;

  @media (max-width: 960px) {
    grid-template-columns: 2fr 2fr 1fr;
    row-gap: 2rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 2fr 2fr;
  }
}
</style>
