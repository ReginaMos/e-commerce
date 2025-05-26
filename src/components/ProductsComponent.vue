<script setup lang="ts">
import { getProducts } from '../services/catalog';
import type { ProductInfo } from '../models/models';
import { ref, onMounted } from 'vue';
import ProductItem from '../elements/ProductItem.vue';
import router from '../router';
import { Links } from '../constants/routersLinks';

const props = defineProps({
  productsCount: Number,
});

const products = ref<ProductInfo[]>([]);

onMounted(async () => {
  products.value = props.productsCount != null ? await getProducts(props.productsCount) : await getProducts();
});

function goToProduct(id: string): void {
  router.push({ name: Links.PRODUCT.NAME, params: { id } });
}
</script>

<template>
  <v-container class="products">
    <v-row class="justify-center">
      <ProductItem
        v-for="(product, ind) in products"
        :key="ind"
        class="mx-4 my-4"
        :item="product"
        @click="goToProduct(product.id)"
      />
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
.products
  margin-top: 10px
</style>
