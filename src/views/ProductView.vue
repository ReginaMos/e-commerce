<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProductById } from '../services/catalog';
import { onMounted, ref } from 'vue';
import type { ProductInfo } from '../models/models';
import ProductPageContent from '../components/ProductPageContent.vue';
import ProductPageSlider from '../components/ProductPageSlider.vue';
import ModalWindowComponent from '../components/ModalWindowComponent.vue';

const route = useRoute();
const id = route.params.id;
const product = ref<ProductInfo | null>(null);

onMounted(async () => {
  if (typeof id === 'string') {
    product.value = await getProductById(id);
    console.log(product.value);
  } else {
    console.error('invalid param Id:', id);
  }
});
</script>

<template>
  <v-container class="product-page">
    <v-row class="product-page-container">
      <v-col>
        <ModalWindowComponent v-if="product" :images="product.images" :altText="product.name">
          <template #activator="slotProps">
            <ProductPageSlider v-bind="slotProps" v-if="product" :product="product"/>
          </template>
        </ModalWindowComponent>
      </v-col>
      <v-col class="text-left product-content">
        <ProductPageContent v-if="product" :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.product-page-container {
  flex-direction: column;
  align-items: flex-start;
  @media screen and (min-width: 748px) {
    flex-direction: row;
  }
}
.product-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  white-space: pre-line;
  line-height: normal;
}
</style>
