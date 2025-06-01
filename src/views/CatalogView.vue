<script setup lang="ts">
import ProductsComponent from '../components/ProductsComponent.vue';
import { ref, onMounted } from 'vue';
import { getProducts, getProductsByCategoryKey } from '../services/catalog';
import type { ProductInfo } from '../models/models';
import FilterByCategories from '../elements/FilterByCategories.vue';
import FilterByBrand from '../elements/FilterByBrand.vue';

const products = ref<ProductInfo[]>([]);
// const filter = ref<Filter>({category: '', size: '', brand: ''});

async function handleCategory(key: string) {
  products.value = await getProductsByCategoryKey(key);
}

onMounted(async () => {
  products.value = await getProducts();
  console.log(products.value[0])
});
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-row>
      <v-col>
        <FilterByCategories @chooseCategory="handleCategory" />
      </v-col>
      <v-col>
        <FilterByBrand />
      </v-col>
    </v-row>
  </v-container>

  <ProductsComponent :products="products" />
</template>

<style scoped></style>
