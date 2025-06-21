<script setup lang="ts">
import AdvantagesComponent from '../components/AdvantagesComponent.vue';
import CategoriesComponent from '../components/CategoriesComponent.vue';
import CarouselElement from '../elements/CarouselElement.vue';
import MainHeading from '../elements/MainHeading.vue';
import ProductsComponent from '../components/ProductsComponent.vue';
import ButtonElement from '../elements/ButtonElement.vue';
import type { ProductInfo } from '../models/models';
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/catalog';

const products = ref<ProductInfo[]>([]);

function updateQuantity(ind: number, quantity: number): void {
  products.value[ind].inCartQuantity = quantity;
}

onMounted(async () => {
  products.value = await getProducts(3);
});
</script>

<template>
  <v-container fluid>
    <v-row class="mb-4">
      <CarouselElement />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Why us?" />
      <AdvantagesComponent />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Categories" />
      <CategoriesComponent />
    </v-row>

    <v-row class="mb-4">
      <MainHeading title="Our products" />
      <ProductsComponent :products="products" @update-quantity="updateQuantity" />
      <ButtonElement title="View all products" link="/catalog" />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass"></style>
