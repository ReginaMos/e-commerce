<script setup lang="ts">
import ProductsComponent from '../components/ProductsComponent.vue';
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/catalog';
import type { ProductInfo } from '../models/models';

const products = ref<ProductInfo[]>([]);

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<template>
  <ProductsComponent :products="products"/>
</template>

<style scoped></style>
