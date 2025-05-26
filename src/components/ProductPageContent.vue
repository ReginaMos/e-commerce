<script setup lang="ts">
import ProductFullPrice from '../elements/ProductFullPrice.vue';
import ProductSizeComponent from './ProductSizeComponent.vue';
import ProductQuantityComponent from './ProductQuantityComponent.vue';
import type { ProductInfo, Attributes } from '../models/models.ts';
import type { Ref, ComputedRef } from 'vue';
import { ref, computed, watch } from 'vue';

const props = defineProps<{
    product?: ProductInfo
}>();

const sizes: ComputedRef<Array<string>> = computed(
  () =>
    props.product?.attributes
      .find((attr: Attributes) => attr.name === 'size')
      ?.value.split(',')
      .map((s) => s.trim()) ?? []
);
const {name, price, discountedPrice, currency, quantity, description} = props.product;
const selectedSize: Ref<string, string> = ref(sizes.value[0] ?? 'One size');

watch(sizes, (newSizes) => {
  if (!newSizes.includes(selectedSize.value)) {
    selectedSize.value = newSizes[0] ?? 'One size';
  }
});

const count = ref(1);
</script>
<template>
    <h2>{{ name }}</h2>
    <ProductFullPrice :price="price" :discountedPrice="discountedPrice" :currency="currency"/>
    <p>{{ description }}</p>
    <v-divider></v-divider>
    <p>
          Brand:&nbsp;<span class="brand">{{
            product?.attributes.find((attr: Attributes) => attr.name === 'brand')?.value
          }}</span>
        </p>
    <ProductSizeComponent v-model="selectedSize" :sizes="sizes" />
    <ProductQuantityComponent v-model="count" :min="1" :max="quantity" />
    <v-btn v-if="quantity || 0 > 0" class="btn"> Add to Cart </v-btn>
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
</style>