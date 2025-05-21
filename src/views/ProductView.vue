<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProductById } from '../services/catalog';
import { ref, computed } from 'vue';
import type { ProductInfo, Attributes } from '../models/models';

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

const name = computed(() => product.value?.name || '');
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-img :src="product?.images[0].url" :alt="product?.name"></v-img>
      </v-col>
      <v-col cols="6">
        <h2>{{ name }}</h2>
        <p v-if="product?.discountedPrice">
          <span style="color: red; font-weight: bold">{{ product?.discountedPrice }}</span
          ><span style="color: red; font-weight: bold">{{ product?.currency }}</span
          >&nbsp;&nbsp;<span style="text-decoration: line-through; color: gray">{{ product?.price }}</span
          ><span style="text-decoration: line-through; color: gray">{{ product?.currency }}</span>
        </p>
        <p v-else>{{ product?.price }} {{ product?.currency }}</p>
        <p>Description: {{ product?.description }}</p>
        <p>Sizes: {{ product?.size }}</p>
        <p>Quantity: {{ product?.quantity }}</p>
        <p>Brand: {{ product?.attributes.find((attr: Attributes) => attr.name === "brand")?.value }}</p>
        <v-btn v-if="product?.quantity || 0 > 0" class="btn">
          Add to Cart
        </v-btn>
        <p v-else>This product sold</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.btn {
  width: fit-content;
  background-color: var(--red-secondary);
  color: var(--white-text);
}</style>
