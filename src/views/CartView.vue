<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';

import CartElement from '../elements/CartElement.vue';
import { getCartById } from '../services/carts-service';

const cart = ref<Cart | null>(null);
const isLoading = ref(true);

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

function handleQuantityUpdate(newQuantity: number) {
  console.log('New quantity: ', newQuantity);
}

function handleRemove() {
  console.log('Item removed');
}

onMounted(async () => {
  const cartId = 'dbca236b-c5da-4658-a647-192811f15fd4';
  try {
    cart.value = await getCartById(cartId);
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err.message, 'error');
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <v-container>
    <v-row v-if="isLoading">
      <v-col>
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>

    <v-row v-else-if="cart?.lineItems?.length">
      <v-col>
        <CartElement
          v-for="item in cart.lineItems"
          :key="item.id"
          :item="item"
          @remove="handleRemove"
          @update:quantity="handleQuantityUpdate"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="info">Your cart is empty</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
