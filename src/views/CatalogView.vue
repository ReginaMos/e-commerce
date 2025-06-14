<script setup lang="ts">
import ProductsComponent from '../components/ProductsComponent.vue';
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/catalog';
import type { ProductInfo, Filter, SortBy, SortType } from '../models/models';
import FilterByCategories from '../elements/FilterByCategories.vue';
import FilterByBrand from '../elements/FilterByBrand.vue';

const products = ref<ProductInfo[]>([]);
const filter = ref<Filter>({});
const sorter = ref<SortBy>({});
const arrowIcons = ref<string[]>(['', 'mdi-arrow-down-bold', 'mdi-arrow-up-bold']);
const sortRules: SortType[] = ['', 'asc', 'desc'];
let arrowPriceInd = ref<number>(0);
let arrowNameInd = ref<number>(0);

async function handleCategory(key: string) {
  if (key === 'ALL') delete filter.value.category;
  else filter.value.category = key;
  products.value = await getProducts(undefined, filter.value, sorter.value);
}

async function handleBrand(key: string) {
  if (key === 'ALL') delete filter.value.brand;
  else filter.value.brand = key;
  products.value = await getProducts(undefined, filter.value, sorter.value);
}

async function sortedPrice() {
  arrowPriceInd.value = (arrowPriceInd.value + 1) % 3;
  sorter.value.price = sortRules[arrowPriceInd.value];
  products.value = await getProducts(undefined, filter.value, sorter.value);
}

async function sortedNames() {
  arrowNameInd.value = (arrowNameInd.value + 1) % 3;
  sorter.value.name = sortRules[arrowNameInd.value];
  products.value = await getProducts(undefined, filter.value, sorter.value);
}

function updateQuantity(ind: number, quantity: number): void {
  products.value[ind].inCartQuantity = quantity;
}

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<template>
  <v-container class="d-flex align-center justify-center">
    <v-row class="justify-center" align="center">
      <v-col>
        <v-row>
          <v-col cols="auto">
            <h2>Filters:</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <FilterByCategories @chooseCategory="handleCategory" />
          </v-col>
          <v-col cols="auto">
            <FilterByBrand @chooseBrand="handleBrand" />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="auto">
            <h2>Sorts by:</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-btn color="primary" @click="sortedPrice">
              Price <v-icon>{{ arrowIcons[arrowPriceInd] }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" @click="sortedNames">
              Name <v-icon>{{ arrowIcons[arrowNameInd] }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <ProductsComponent :products="products" v-if="products.length" @update-quantity="updateQuantity" />

  <v-card v-else class="mx-auto my-8" elevation="16" max-width="344">
    <v-card-item>
      <v-card-title> Sorry </v-card-title>
    </v-card-item>

    <v-card-text>
      We don't have any products with these characteristics <v-icon>mdi-emoticon-sad-outline</v-icon>
    </v-card-text>
  </v-card>

  <v-pagination> </v-pagination>
</template>

<style scoped></style>
