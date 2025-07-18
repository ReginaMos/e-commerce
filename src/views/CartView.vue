<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import type { Cart } from '@commercetools/platform-sdk';
import type { BreadcrumbItem } from 'vuetify/lib/components/VBreadcrumbs/VBreadcrumbs.mjs';

import CartElement from '../elements/CartElement.vue';
import BreadCrumbsComponent from '../components/BreadCrumbsComponent.vue';
import { Links } from '../constants/routersLinks';
import {
  removeCartItem,
  updateCartItemQuantity,
  clearCart,
  applyDiscountCode,
  activeCart,
} from '../services/carts-service';
import { useConfirmationModal } from '../utils/confirmation-modal';
import ConfirmModalComponent from '../components/ConfirmModalComponent.vue';

const isLoading = ref(false);
const promoCode = ref('');
const isPromoLoading = ref(false);
const { isModalOpen, showModal } = useConfirmationModal();

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
  if (!activeCart.value?.totalPrice) return null;

  const { currencyCode, fractionDigits, centAmount } = activeCart.value.totalPrice;
  const discountedAmount = activeCart.value.discountOnTotalPrice?.discountedAmount ?? null;
  const amount = centAmount / Math.pow(10, fractionDigits);

  if (discountedAmount) {
    const originalAmount = discountedAmount.centAmount / Math.pow(10, fractionDigits) + amount;
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
  if (!activeCart.value) return;

  isLoading.value = true;
  try {
    await action(activeCart.value, ...args);
    toaster?.show(successMessage, 'success');
  } catch (err) {
    if (err instanceof Error) {
      toaster?.show(err.message, 'error');
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

const handleQuantityUpdate = (lineItemId: string, quantity: number) => {
  updateCart<[string, number]>(updateCartItemQuantity, 'Quantity updated successfully', lineItemId, quantity);
};

const handleRemove = (lineItemId: string) =>
  updateCart<[string]>(removeCartItem, 'Item removed successfully', lineItemId);

const handleClearCart = () => updateCart<[]>(clearCart, 'Cart cleared successfully');

const handleConfirm = () => {
  showModal('Clear Cart', 'Are you sure you want to remove all items from your cart?');
};
</script>

<template>
  <BreadCrumbsComponent :items="items" />
  <v-container class="mt-16">
    <v-row v-if="isLoading">
      <v-col>
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>

    <v-row v-else-if="activeCart?.lineItems?.length">
      <v-col>
        <CartElement
          v-for="item in activeCart.lineItems"
          :key="item.id"
          :item="item"
          @remove="handleRemove"
          @update:quantity="handleQuantityUpdate"
        />
        <v-divider class="my-4" />

        <div class="d-flex justify-space-between align-center">
          <v-btn color="error" variant="outlined" @click="handleConfirm">Clear Cart</v-btn>
          <ConfirmModalComponent
            v-model="isModalOpen"
            title="Clear Cart"
            message="Are you sure you want to remove all items from your cart?"
            @confirm="handleClearCart"
          />

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
