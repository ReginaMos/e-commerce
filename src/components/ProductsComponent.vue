<script setup lang="ts">
import { getProducts } from '../services/catalog';
import type { ProductInfo } from '../models/models';
import { ref, onMounted } from 'vue';
import ProductItem from '../elements/ProductItem.vue';

const products = ref<ProductInfo[]>([]);

onMounted(async () => {
  products.value = await getProducts(4);
});
</script>

<template>
  <v-container class="products">
    <v-row class="justify-center">
      <ProductItem v-for="(product, ind) in products" :key="ind" class="mx-4" :item="product" />
    </v-row>
    <v-row>
      <v-col>
        <RouterLink to="/catalog">
          <v-btn class="catalog-btn">View All Products</v-btn>
        </RouterLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
.catalog-btn
  color: #fff
  background-color: #db4444
  margin-top: 20px

.products
  margin-top: 10px
</style>
