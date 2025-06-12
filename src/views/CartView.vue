<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';

import CartElement from '../elements/CartElement.vue';
import { Links } from '../constants/routersLinks';
import { getCartById, removeCartItem, updateCartItemQuantity, clearCart } from '../services/carts-service';

const cart = ref<Cart | null>(null);
const isLoading = ref(true);

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

type CartAction<T extends unknown[]> = (cart: Cart, ...args: T) => Promise<Cart>;

const cartTotal = computed(() => {
  if (!cart.value?.totalPrice) return null;

  const { currencyCode, fractionDigits, centAmount } = cart.value.totalPrice;
  const amount = centAmount / Math.pow(10, fractionDigits);

  return `${currencyCode} ${amount.toFixed(2)}`;
});

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

const handleQuantityUpdate = (lineItemId: string, quantity: number, maxQuantity: number) => {
  const validQuantity = Math.min(Math.max(1, quantity), maxQuantity);

  if (validQuantity !== quantity) {
    toaster?.show('Invalid quantity value', 'warning');
    return;
  }

  updateCart<[string, number]>(updateCartItemQuantity, 'Quantity updated successfully', lineItemId, validQuantity);
};

const handleRemove = (lineItemId: string) =>
  updateCart<[string]>(removeCartItem, 'Item removed successfully', lineItemId);

const handleClearCart = () => updateCart<[]>(clearCart, 'Cart cleared successfully');

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
        <v-divider class="my-4" />
        <div class="d-flex justify-space-between align-center">
          <v-btn color="error" variant="outlined" @click="handleClearCart">Clear Cart</v-btn>
          <v-card variant="flat">
            <v-card-text class="text-h6"> Total cost: {{ cartTotal }} </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="info">Your cart is empty</v-alert>
        <v-btn :to="Links.CATALOG.LINK">Continue Shopping</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
