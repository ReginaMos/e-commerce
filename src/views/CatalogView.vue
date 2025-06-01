<script setup lang="ts">
import ProductsComponent from '../components/ProductsComponent.vue';
import { ref, onMounted } from 'vue';
import { getFilteredProducts } from '../services/catalog';
import type { ProductInfo, Filter } from '../models/models';
import FilterByCategories from '../elements/FilterByCategories.vue';
import FilterByBrand from '../elements/FilterByBrand.vue';

const products = ref<ProductInfo[]>([]);
const filter = ref<Filter>({});

async function handleCategory(key: string) {
  filter.value.category = key;
  products.value = await getFilteredProducts(undefined, filter.value);
}

async function handleBrand(key: string) {
  filter.value.brand = key;
  products.value =  await getFilteredProducts(undefined, filter.value);
}

onMounted(async () => {
  products.value = await getFilteredProducts();
});
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-row>
      <v-col>
        <FilterByCategories @chooseCategory="handleCategory" />
      </v-col>
      <v-col>
        <FilterByBrand @chooseBrand="handleBrand"  />
      </v-col>
    </v-row>
  </v-container>

  <ProductsComponent :products="products" v-if="products.length"/>

  <v-card
    v-else
    class="mx-auto my-8"
    elevation="16"
    max-width="344"
  >
    <v-card-item>
      <v-card-title>
        Sorry
      </v-card-title>
    </v-card-item>

    <v-card-text>
      We don't have any products with these characteristics <v-icon>mdi-emoticon-sad-outline</v-icon>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
