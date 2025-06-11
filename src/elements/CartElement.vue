<script setup lang="ts">
import type { LineItem } from '@commercetools/platform-sdk';
import { computed } from 'vue';

interface Props {
  item: LineItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'remove'): void;
  (e: 'update:quantity', quantity: number): void;
}>();

const image = props.item.variant.images?.[0]?.url;
const name = props.item.name.en;
const currencyCode = props.item.price.value.currencyCode;
const fractionDigits = Math.pow(10, props.item.price.value.fractionDigits);
const price = props.item.price.value.centAmount / fractionDigits;
const quantity = computed(() => props.item.quantity);
const subtotal = computed(() => props.item.totalPrice.centAmount / fractionDigits);
const min = props.item.variant.availability?.isOnStock ? 1 : 0;
const max = props.item.variant.availability?.availableQuantity || 99;

function handleQuantityChange(newQuantity: number) {
  emit('update:quantity', newQuantity);
}
</script>

<template>
  <v-card class="d-flex align-center pa-4 mb-4" variant="elevated">
    <v-img :src="image" width="100" height="100" cover class="rounded"></v-img>
    <v-card-title class="pa-0">{{ name }}</v-card-title>
    <v-card-text class="pa-0 text-body-1"> {{ currencyCode }} {{ price.toFixed(2) }}</v-card-text>

    <v-number-input
      max-width="80"
      :model-value="quantity"
      :min="min"
      :max="max"
      controlVariant="stacked"
      inset
      variant="outlined"
      hide-details
      @update:model-value="handleQuantityChange"
    ></v-number-input>

    <v-card-text class="pa-0 text-body-1"> {{ currencyCode }} {{ subtotal.toFixed(2) }}</v-card-text>
    <v-btn class="pa-0" color="error" variant="text" @click="emit('remove')" icon="mdi-delete"></v-btn>
  </v-card>
</template>

<style scoped></style>
