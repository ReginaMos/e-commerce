<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';

import CartElement from '../elements/CartElement.vue';
import { getCartById, removeCartItem, updateCartItemQuantity } from '../services/carts-service';

const cart = ref<Cart | null>(null);
const isLoading = ref(true);

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

type CartAction<T extends unknown[]> = (cart: Cart, ...args: T) => Promise<Cart>;

async function updateCart<T extends unknown[]>(action: CartAction<T>, successMessage: string, ...args: T) {
  if (!cart.value) return;

  isLoading.value = true;
  try {
    cart.value = await action(cart.value, ...args);
    toaster?.show(successMessage, 'success');
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err.message, 'error');
    }
  } finally {
    isLoading.value = false;
  }
}

const handleQuantityUpdate = (lineItemId: string, quantity: number) =>
  updateCart<[string, number]>(updateCartItemQuantity, 'Quantity updated successfully', lineItemId, quantity);

const handleRemove = (lineItemId: string) =>
  updateCart<[string]>(removeCartItem, 'Item removed successfully', lineItemId);

onMounted(async () => {
  const cartId = 'dbca236b-c5da-4658-a647-192811f15fd4';
  try {
    cart.value = await getCartById(cartId);
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err?.message, 'error');
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
