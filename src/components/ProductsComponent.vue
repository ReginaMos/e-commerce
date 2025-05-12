<script setup lang="ts">
import { getProducts } from '../services/catalog';

const products = await getProducts(4);
</script>

<template>
  <v-container>
    <v-row>
        <v-col v-for="(product, ind) in products" :key="ind" class="mx-4">
            <ProductItem :item="product" />
        </v-col>
        
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

<style scoped lang="sass"></style>