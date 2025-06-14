<script setup lang="ts">
import type { ProductInfo } from '../models/models';
import ProductItem from '../elements/ProductItem.vue';
import router from '../router';
import { Links } from '../constants/routersLinks';

const props = defineProps<{
  products: ProductInfo[];
}>();
const emit = defineEmits<{
  (e: 'update-quantity', ind: number, quantity: number): void;
}>();

function goToProduct(id: string): void {
  router.push({ name: Links.PRODUCT.NAME, params: { id } });
}
</script>

<template>
  <v-container class="products">
    <v-row class="justify-center">
      <ProductItem
        v-for="(product, ind) in props.products"
        :key="ind"
        class="mx-4 my-4"
        :item="product"
        @click="goToProduct(product.id)"
        @update-quantity="(quantity) => emit('update-quantity', ind, quantity)"
      />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
.products
  margin-top: 10px
</style>
