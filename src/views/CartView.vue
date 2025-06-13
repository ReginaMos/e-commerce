<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';
import type { BreadcrumbItem } from 'vuetify/lib/components/VBreadcrumbs/VBreadcrumbs.mjs';

import CartElement from '../elements/CartElement.vue';
import BreadCrumbsComponent from '../components/BreadCrumbsComponent.vue';
import { Links } from '../constants/routersLinks';
import {
  getCartById,
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
  applyDiscountCode,
} from '../services/carts-service';

const cart = ref<Cart | null>(null);
const isLoading = ref(true);
const promoCode = ref('');
const isPromoLoading = ref(false);

const toaster = inject<{ show: (message: string, color?: string) => void }>('toaster');

type CartAction<T extends unknown[]> = (cart: Cart, ...args: T) => Promise<Cart>;

const items = computed<BreadcrumbItem[]>(() => [
  {
    title: Links.HOME.NAME,
    disabled: false,
    to: Links.HOME.LINK,
  },
  {
    title: Links.CART.NAME,
    disabled: true,
    to: Links.CART.LINK,
  },
]);

const cartTotal = computed(() => {
  if (!cart.value?.totalPrice) return null;

  const { currencyCode, fractionDigits, centAmount } = cart.value.totalPrice;
  const amount = centAmount / Math.pow(10, fractionDigits);

  const originalAmount =
    cart.value.lineItems.reduce((sum, item) => sum + item.price.value.centAmount * item.quantity, 0) /
    Math.pow(10, fractionDigits);

  if (originalAmount > amount) {
    return {
      original: `${currencyCode} ${originalAmount.toFixed(2)}`,
      discounted: `${currencyCode} ${amount.toFixed(2)}`,
    };
  }

  return {
    discounted: `${currencyCode} ${amount.toFixed(2)}`,
  };
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
      console.log(err);
    }
  } finally {
    isLoading.value = false;
  }
}

const handleApplyPromoCode = () => {
  if (!promoCode.value) return;

  isPromoLoading.value = true;
  updateCart<[string]>(applyDiscountCode, 'Promo code applied successfully', promoCode.value).finally(() => {
    isPromoLoading.value = false;
    promoCode.value = '';
  });
};

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
  const cartId = '1b1e1945-98c8-483b-8b56-c332a4e3eff4'; // cart with items
  //  const cartId = 'd8575c9f-40f7-4f75-88f5-276dcd7e33b2'; // empty cart

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
  <BreadCrumbsComponent :items="items" />
  <v-container class="mt-16">
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

          <div class="text-h6">
            Total:
            <template v-if="cartTotal?.original">
              <span class="text-decoration-line-through mr-2">{{ cartTotal.original }}</span>
              <span class="text-error">{{ cartTotal.discounted }}</span>
            </template>
            <template v-else>
              {{ cartTotal?.discounted }}
            </template>
          </div>
        </div>
        <v-divider class="my-4" />

        <v-form @submit.prevent="handleApplyPromoCode" class="mb-4">
          <v-row align="center">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="promoCode"
                label="Promo Code"
                placeholder="Enter your promo code"
                :disabled="isPromoLoading"
                hide-details
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="auto">
              <v-btn type="submit" color="black" variant="outlined" :loading="isPromoLoading" :disabled="!promoCode">
                Apply Code
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="info">Your cart is empty</v-alert>
        <v-divider class="my-4" />
        <v-btn :to="Links.CATALOG.LINK">Continue Shopping</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
