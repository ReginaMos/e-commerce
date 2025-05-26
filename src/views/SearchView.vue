<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import {useRoute } from 'vue-router';
import type {ProductInfo} from '../models/models.ts';
import { searchProducts} from '../services/catalog.ts';
import router from '../router/index.ts';
import { Links } from '../constants/routersLinks.ts';
import ProductItem from '../elements/ProductItem.vue';

const route = useRoute();
const searchQuery = ref('');
const products = ref<ProductInfo[]>([]);

onMounted(async () => {
  if (route.query.search && typeof route.query.search === 'string') {
    searchQuery.value = route.query.search;
  }
  products.value = await searchProducts(searchQuery.value);
  console.log(products.value);
});

watch(() => route.query.search, async (newSearch) => {
  if (typeof newSearch === 'string') {
    searchQuery.value = newSearch;
    products.value = await searchProducts(newSearch);
  }
});
function goToProduct(id: string): void {
  router.push({ name: Links.PRODUCT.NAME, params: { id } });
}
</script>
<template>
  <h1>Search Page</h1>
  <p > We found {{products.length}} results by query "{{searchQuery}}"</p>
  <v-container class="search-container" >
    <v-row class="justify-center" v-if="products.length">
      <ProductItem
        v-for="(product) in products"
        :key="product.id"
        class="mx-4 my-4"
        :item="product"
        @click="goToProduct(product.id)"
      />
    </v-row>
    <v-row v-else class="catalog-navigate">
        <p>Try to find products in the</p>
        <RouterLink :to="Links.CATALOG.LINK">
            <v-btn class="btn"> Catalog </v-btn>
        </RouterLink>
        </v-row>
  </v-container>
 
</template>
<style scoped>
.catalog-navigate {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    margin-top: 50px;
}
.btn {
  width: fit-content;
  background-color: var(--red-secondary);
  color: var(--white-text);
}
</style>
