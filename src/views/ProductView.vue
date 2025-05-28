<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProductById } from '../services/catalog';
import { onMounted, ref } from 'vue';
import type { ProductInfo } from '../models/models';
import ProductPageContent from '../components/ProductPageContent.vue';
import ProductPageSlider from '../components/ProductPageSlider.vue';
import ModalWindowComponent from '../components/ModalWindowComponent.vue';
import BreadCrumbsComponent from '../components/BreadCrumbsComponent.vue';
import { Links } from '../constants/routersLinks.ts';
import { computed } from 'vue';

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
const items = computed(() => [
  {
    title: Links.HOME.NAME,
    disabled: false,
    to: Links.HOME.LINK,
  },
  {
    title: Links.CATALOG.NAME,
    disabled: false,
    to: Links.CATALOG.LINK,
  },
  {
    title: product.value?.name,
    disabled: true,
  },
]);
</script>

<template>
  <BreadCrumbsComponent :items="items"/>
  <v-container class="product-page">
    <v-row class="product-page-container">
      <v-col>
        <ModalWindowComponent v-if="product" :images="product.images" :altText="product.name">
          <template #activator="slotProps">
            <ProductPageSlider v-bind="slotProps" v-if="product" :product="product" />
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
.product-page {
  margin-top: 80px;
  width: 100%;
  @media screen and (min-width: 1024px) {
  margin-top: 40px;
  }  
}
.product-page-container {
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  padding: 0;
  gap: 30px;
  @media screen and (min-width: 748px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
  }
}
.product-page-container :deep(.v-col) {
  padding: 0;
}
.product-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  white-space: pre-line;
  line-height: normal;
}
</style>
