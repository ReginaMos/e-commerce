<script setup lang="ts">
import type { LineItem } from '@commercetools/platform-sdk';
import { computed } from 'vue';

interface Props {
  item: LineItem;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'remove', lineItemId: string): void;
  (e: 'update:quantity', lineItemId: string, quantity: number): void;
}>();

const id = props.item.id;
const image = props.item.variant.images?.[0]?.url;
const name = props.item.name['en-US'];

const currencyCode = props.item.price.value.currencyCode;
const fractionDigits = Math.pow(10, props.item.price.value.fractionDigits);
const price = computed(() => {
  const originalPrice = props.item.price.value.centAmount / fractionDigits;
  const discountedPrice = props.item.price.discounted?.value.centAmount;

  return discountedPrice ? discountedPrice / fractionDigits : originalPrice;
});
const quantity = props.item.quantity;
const subtotal = props.item.totalPrice.centAmount / fractionDigits;
const min = 1;
const max = props.item.variant.availability?.availableQuantity || 99;

function handleQuantityChange(newQuantity: number) {
  if (newQuantity < 1 || newQuantity > max) {
    return;
  }
  emit('update:quantity', id, newQuantity);
}
</script>

<template>
  <v-card class="grid pa-2 mb-4" variant="elevated">
    <v-img :src="image" min-width="100" max-width="100" cover class="rounded img"></v-img>
    <v-card-text class="pa-0 text-body-1 title">{{ name }}</v-card-text>
    <v-card-text class="pa-0 text-body-1 price"> {{ currencyCode }} {{ price.toFixed(2) }}</v-card-text>

    <v-number-input
      max-width="80"
      :model-value="quantity"
      :min="min"
      :max="max"
      class="quantity"
      controlVariant="stacked"
      inset
      variant="outlined"
      hide-details
      @update:model-value="handleQuantityChange"
    ></v-number-input>

    <v-card-text class="pa-0 text-body-1 total"> {{ currencyCode }} {{ subtotal.toFixed(2) }}</v-card-text>
    <v-btn class="pa-0 clear" color="error" variant="text" @click="emit('remove', id)" icon="mdi-delete"></v-btn>
  </v-card>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr;
  grid-template-areas: 'img title price quantity total clear';
  align-items: center;
  justify-items: center;

  @media (max-width: 999px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      'img title title title'
      'price quantity total clear';
    row-gap: 40px;
  }

  @media (max-width: 499px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'img title title'
      'price empty quantity'
      'total empty clear';
    row-gap: 20px;
  }
  .img {
    grid-area: img;
  }
  .title {
    grid-area: title;
  }
  .price {
    grid-area: price;
  }
  .quantity {
    grid-area: quantity;
  }
  .total {
    grid-area: total;
  }
  .clear {
    grid-area: clear;
  }
}
</style>
