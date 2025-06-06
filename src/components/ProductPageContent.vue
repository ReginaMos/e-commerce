<script setup lang="ts">
import ProductFullPrice from '../elements/ProductFullPrice.vue';
import ProductSizeComponent from './ProductSizeComponent.vue';
import ProductQuantityComponent from './ProductQuantityComponent.vue';
import type { ProductInfo, Attributes } from '../models/models.ts';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  product?: ProductInfo;
}>();

const sizes: ComputedRef<Array<string>> = computed(
  () =>
    props.product?.attributes
      .find((attr: Attributes) => attr.name === 'size')
      ?.value.split(',')
      .map((s) => s.trim()) ?? []
);
const productDetails = computed(() => {
  if (!props.product) return null;
  const { name, price, discountedPrice, currency, quantity, description } = props.product;
  return { name, price, discountedPrice, currency, quantity, description };
});

const selectedSize: Ref<string, string> = ref(sizes.value[0] ?? 'One size');

watch(sizes, (newSizes) => {
  if (!newSizes.includes(selectedSize.value)) {
    selectedSize.value = newSizes[0] ?? 'One size';
  }
});

const count = ref(1);
const isActive = ref(localStorage.getItem('wishlist') ?? false);
function addToWishList() {
  isActive.value = !isActive.value;
}
watch(isActive, (newVal) => {
  localStorage.setItem('wishlist', JSON.stringify(newVal));
});
</script>
<template>
  <h2>{{ productDetails?.name }}</h2>
  <ProductFullPrice
    v-if="productDetails"
    :price="productDetails?.price"
    :discountedPrice="productDetails?.discountedPrice"
    :currency="productDetails?.currency"
  />
  <p>{{ productDetails?.description }}</p>
  <v-divider></v-divider>
  <p>
    Brand:&nbsp;<span class="brand">{{
      product?.attributes.find((attr: Attributes) => attr.name === 'brand')?.value
    }}</span>
  </p>
  <ProductSizeComponent v-model="selectedSize" :sizes="sizes" />
  <div class="row-container">
    <ProductQuantityComponent v-model="count" :min="1" :max="productDetails?.quantity" />
    <v-btn
      class="icon-button"
      variant="plain"
      size="48"
      :class="isActive ? 'active-btn' : 'inactive-btn'"
      @click="addToWishList"
    >
      <v-icon icon="mdi mdi-heart-outline"></v-icon>
    </v-btn>
  </div>

  <v-btn v-if="productDetails?.quantity || 0 > 0" class="btn"> Add to Cart </v-btn>

  <p v-else>This product sold</p>
</template>
<style scoped lang="scss">
.btn {
  width: fit-content;
  background-color: var(--red-secondary);
  color: var(--white-text);
}
.brand {
  font-weight: bold;
}
.icon-button {
  min-width: 48px;
  max-width: 48px;
  max-height: 48px;
  padding: 0;
  border-radius: 50%;
  transition: background-color 0.28s ease-in-out;
  opacity: 1;
  &:hover,
  &:focus {
    color: var(--white-text);
    background-color: var(--red-secondary);
    transition: background-color 0.28s ease-in-out;
  }
}
.row-container {
  display: flex;
  gap: 30px;
  align-items: center;
}
.active-btn {
  color: var(--white-text);
  background-color: var(--red-secondary);
}
.inactive-btn {
  background-color: transparent !important;
  color: var(--black-text) !important;
  transition: background-color 0.28s ease-in-out;
}
</style>
