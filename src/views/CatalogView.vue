<script setup lang="ts">
import ProductsComponent from '../components/ProductsComponent.vue';
import { ref, onMounted, watch } from 'vue';
import { getProducts, totalProducts } from '../services/catalog';
import type { ProductInfo, Filter, SortBy, SortType } from '../models/models';
import FilterByCategories from '../elements/FilterByCategories.vue';
import FilterByBrand from '../elements/FilterByBrand.vue';

const products = ref<ProductInfo[]>([]);
const filter = ref<Filter>({});
const sorter = ref<SortBy>({});
const arrowIcons = ref<string[]>(['', 'mdi-arrow-down-bold', 'mdi-arrow-up-bold']);
const sortRules: SortType[] = ['', 'asc', 'desc'];
const currentPage = ref(1);
const loading = ref(true);
let pagesCount = 0;
let arrowPriceInd = ref<number>(0);
let arrowNameInd = ref<number>(0);

async function getData() {
  loading.value = true;
  products.value = await getProducts(6, currentPage.value, filter.value, sorter.value);
  pagesCount = Math.ceil(totalProducts.value / 6);
  loading.value = false;
}

async function handleCategory(key: string) {
  if (key === 'ALL') delete filter.value.category;
  else filter.value.category = key;
  currentPage.value = 1;
  await getData();
}

async function handleBrand(key: string) {
  if (key === 'ALL') delete filter.value.brand;
  else filter.value.brand = key;
  currentPage.value = 1;
  await getData();
}

async function sortedPrice() {
  arrowPriceInd.value = (arrowPriceInd.value + 1) % 3;
  sorter.value.price = sortRules[arrowPriceInd.value];
  currentPage.value = 1;
  await getData();
}

async function sortedNames() {
  arrowNameInd.value = (arrowNameInd.value + 1) % 3;
  sorter.value.name = sortRules[arrowNameInd.value];
  currentPage.value = 1;
  await getData();
}

function updateQuantity(ind: number, quantity: number): void {
  products.value[ind].inCartQuantity = quantity;
}

watch(currentPage, async () => {
  await getData();
});

onMounted(async () => {
  products.value = await getProducts(6);
  pagesCount = Math.ceil(totalProducts.value / 6);
  loading.value = false;
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

  <v-pagination :length="pagesCount" v-model="currentPage"> </v-pagination>

  <div v-if="loading" class="loader-overlay d-flex align-center justify-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </div>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
</style>
